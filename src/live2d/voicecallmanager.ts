import { LAppModel } from "./lappmodel";

export class VoiceCallManager {
  private FFT_SIZE = 128;
  private SAMPLE_RATE = 24000;
  private wsUrl = "wss://api.charactalk.site/ws/speech?chatRoomId=1";

  private socket: WebSocket | null = null;
  
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private analyserBuffer: Uint8Array | null = null;
  
  private processor: ScriptProcessorNode | null = null;
  private input: MediaStreamAudioSourceNode | null = null;
  private recording = false;
  private recordStartTime: number | null = null;
  private audioQueue: AudioBuffer[] = [];
  private isPlaying = false;

  private startCallBtn: HTMLButtonElement | null = null;
  private recordBtn: HTMLButtonElement | null = null;
  private endCallBtn: HTMLButtonElement | null = null;

  private model: LAppModel | null = null;

  constructor(model: LAppModel) {
    this.startCallBtn = document.getElementById("startCallBtn") as HTMLButtonElement;
    this.recordBtn = document.getElementById("recordBtn") as HTMLButtonElement;
    this.endCallBtn = document.getElementById("endCallBtn") as HTMLButtonElement;
    this.model = model;
    this.bindEvents();
  }

  private bindEvents() {
    this.startCallBtn.addEventListener("click", () => this.startCall());
    this.recordBtn.addEventListener("mousedown", () => this.startRecording());
    this.recordBtn.addEventListener("mouseup", () => this.stopRecording());
    this.recordBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.startRecording();
    });
    this.recordBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.stopRecording();
    });
    this.endCallBtn.addEventListener("click", () => this.endCall());
  }

  private toggleButtons({ start, record, end }: { start: boolean; record: boolean; end: boolean }) {
    this.startCallBtn.disabled = !start;
    this.recordBtn.disabled = !record;
    this.endCallBtn.disabled = !end;
  }

  private async initAudioProcessing() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext({ sampleRate: this.SAMPLE_RATE });
      this.analyserNode = this.audioContext.createAnalyser();
      this.analyserNode.fftSize = this.FFT_SIZE;
      this.analyserBuffer = new Uint8Array(this.analyserNode.frequencyBinCount);
      this.input = this.audioContext.createMediaStreamSource(stream);

      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      this.processor.onaudioprocess = (e) => {
        if (!this.recording || !this.socket || this.socket.readyState !== WebSocket.OPEN) return;

        const floatData = e.inputBuffer.getChannelData(0);
        const int16Buffer = this.float32ToLinear16(floatData);
        this.socket.send(int16Buffer);
      };

      this.input.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (err) {
      console.error("🎤 마이크 접근 실패", err);
    }
  }

  private float32ToLinear16(floatData: Float32Array): ArrayBuffer {
    const buffer = new ArrayBuffer(floatData.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < floatData.length; i++) {
      let sample = Math.max(-1, Math.min(1, floatData[i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(i * 2, sample, true);
    }
    return buffer;
  }

  private decodeLinear16ToAudioBuffer(buffer: ArrayBuffer): AudioBuffer {
    const view = new DataView(buffer);
    const len = buffer.byteLength / 2;
    const audioBuffer = this.audioContext.createBuffer(1, len, this.SAMPLE_RATE);
    const data = audioBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = view.getInt16(i * 2, true) / 32768.0;
    }
    return audioBuffer;
  }

  private playBuffer(buffer: AudioBuffer): Promise<void> {
    return new Promise((resolve) => {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.connect(this.analyserNode);
      source.onended = () => resolve();
      source.start();
    });
  }

  private async playQueue() {
    this.isPlaying = true;

    while (this.audioQueue.length > 0) {
      const buffer = this.audioQueue.shift()!;
      await this.playBuffer(buffer);
    }
    
    this.isPlaying = false;
    this.model.setExpression('NEUTRAL');
  }

  public startCall() {
    this.socket = new WebSocket(this.wsUrl);
    this.socket.binaryType = "arraybuffer";

    this.socket.onopen = async () => {
      console.log("✅ WebSocket 연결됨");

      await this.initAudioProcessing();
      this.toggleButtons({ start: false, record: true, end: true });
    };

    this.socket.onmessage = (event) => {
      const data = event.data;
      if (data instanceof ArrayBuffer) {
        const audioBuffer = this.decodeLinear16ToAudioBuffer(event.data);
        this.audioQueue.push(audioBuffer);
        if (!this.isPlaying) this.playQueue();
      } else {
        const parsed = JSON.parse(data.toString());
        this.model.setExpression(parsed.emotion);
      }
    };

    this.socket.onerror = (e) => {
      console.error("❌ WebSocket 오류", e);
    };

    this.socket.onclose = () => {
      console.log("🔌 WebSocket 종료됨");
    };
  }

  public startRecording() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send("start");
      this.recording = true;
      this.recordStartTime = Date.now();
      console.log("🎙️ 녹음 시작");
    }
  }

  public stopRecording() {
    if (!this.recording) return;
    this.recording = false;

    const duration = Date.now() - (this.recordStartTime ?? 0);
    this.recordStartTime = null;

    if (duration >= 500 && this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send("stop");
      console.log("📤 stop 메시지 전송됨");
    } else {
      console.warn("⏱️ 녹음 시간 0.5초 미만 → 전사 생략");
    }
  }

  public endCall() {
    this.stopRecording();
    this.cleanupAudio();
    this.cleanupSocket();

    this.toggleButtons({ start: true, record: false, end: false });

    console.log("📴 통화 종료");
  }

  private cleanupAudio() {
    this.processor?.disconnect();
    this.input?.disconnect();
    this.audioContext?.close();

    this.processor = null;
    this.input = null;
    this.audioContext = null;
    this.audioQueue = [];
    this.isPlaying = false;
  }

  private cleanupSocket() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
    this.socket = null;
  }
  
  public getNormalizedAverageFrequency(): number {
    if (!this.analyserNode) {
      return 0;
    }
    this.analyserNode.getByteFrequencyData(this.analyserBuffer);
    const easeInQuint = (x: number): number => {
      return x ** 5;
    };
    const normalize = (value: number, min = 0, max = 100): number => {
      const normalized = (value - min) / (max - min);
      return easeInQuint(normalized);
    };
    const avergae = (arr: Uint8Array): number => {
      const sum = arr.reduce((acc, val) => acc + val, 0);
      return sum / arr.length;
    }
    return normalize(avergae(this.analyserBuffer));
  }
}