import { useEffect, useState } from "react"
import { api } from "@/api/instance"

type Story = {
  storyId: number
  title: string
  storyType: string
  imageUrl: string
}

export default function BookSection() {
  const [westernBooks, setWesternBooks] = useState<Story[]>([])

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
  return (
    <div className="mb-10">
      <div>
        <h2 className="text-m mb-4 font-semibold">서양 고전 동화</h2>
        <div className="flex gap-0.5 overflow-x-auto">
          {westernBooks.map((book) => (
            <div key={book.storyId} className="flex min-w-[160px] flex-col items-center">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-[200px] w-[140px] rounded-md object-cover"
              />
              <span className="mt-2 mb-2 text-sm font-semibold">{book.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
