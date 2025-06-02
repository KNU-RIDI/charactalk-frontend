import { useEffect, useState } from "react"
import { api } from "@/api/instance"

type Story = {
  storyId: number
  title: string
  storyType: string
  imageUrl: string
}

type Character = {
  characterId: number
  name: string
  description: string
  imageUrl: string
}

type StoryDetail = {
  storyId: number
  title: string
  description: string
  storyType: string
  imageUrl: string
  characters: Character[]
  tags: string[]
}

export default function BookSection() {
  const [westernBooks, setWesternBooks] = useState<Story[]>([])
  const [selectedBook, setSelectedBook] = useState<Story | null>(null)
  const [storyDetail, setStoryDetail] = useState<StoryDetail | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api().get<Story[]>("/stories")
        const data = res.data
        console.log("받아온 스토리 데이터:", data)

        const western = data.filter((story) => story.storyType.includes("WESTERN"))

        setWesternBooks(western)
      } catch (error) {
        console.error("스토리 목록 불러오기 실패:", error)
      }
    }

    fetchStories()
  }, [])

  useEffect(() => {
    const fetchDetail = async () => {
      if (!selectedBook) return
      try {
        const res = await api().get<StoryDetail>(`/stories/${selectedBook.storyId}`)
        setStoryDetail(res.data)
      } catch (error) {
        console.error("상세 정보 불러오기 실패:", error)
        setStoryDetail(null)
      }
    }

    fetchDetail()
  }, [selectedBook])

  return (
    <div className="mb-10">
      <div>
        <h2 className="text-m mb-4 font-semibold">서양 고전 동화</h2>
        <div className="flex gap-0.5 overflow-x-auto">
          {westernBooks.map((book) => (
            <div
              key={book.storyId}
              className="flex min-w-[160px] cursor-pointer flex-col items-center"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-[200px] w-[140px] rounded-md object-cover"
              />
              <span className="mt-2 mb-2 text-sm font-semibold">{book.title}</span>
            </div>
          ))}
        </div>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative max-h-[85vh] w-full max-w-[900px] overflow-y-auto rounded-lg bg-white px-15 py-15 shadow-lg">
              {/* 닫기 버튼 */}
              <button
                className="absolute top-5 right-5 h-6 w-6"
                onClick={() => {
                  setSelectedBook(null)
                  setStoryDetail(null)
                }}
              >
                <img src="/icons/close.svg" alt="닫기" className="h-full w-full object-contain" />
              </button>

              {/* 상세 정보가 없을 때 */}
              {!storyDetail ? (
                <div className="text-center text-gray-500">상세 정보가 없습니다.</div>
              ) : (
                <>
                  {/* 제목 */}
                  <h2 className="mb-4 text-3xl font-bold">{storyDetail.title}</h2>

                  {/* 설명 */}
                  <p className="mb-10 whitespace-pre-line text-gray-700">
                    {storyDetail.description}
                  </p>

                  {/* 캐릭터 목록 */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {storyDetail.characters.map((char) => (
                      <div
                        key={char.characterId}
                        className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm"
                      >
                        {char.imageUrl ? (
                          <img
                            src={char.imageUrl}
                            alt={char.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null
                              e.currentTarget.src = ""
                            }}
                            className="mb-4 h-24 w-24 rounded-full object-cover"
                          />
                        ) : (
                          <div className="mb-4 h-24 w-24 rounded-full bg-gray-300" />
                        )}
                        <h4 className="mb-2 text-lg font-semibold">{char.name}</h4>
                        <p className="text-sm text-gray-600">{char.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
