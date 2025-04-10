const westernBooks = [
  { id: 1, title: "신데렐라" },
  { id: 2, title: "백설공주" },
  { id: 3, title: "헨젤과 그레텔" },
  { id: 4, title: "라푼젤" },
  { id: 5, title: "미녀와 야수" },
  { id: 6, title: "토끼와 거북이" },
  { id: 7, title: "미녀와 야수" },
]

const koreanBooks = [
  { id: 7, title: "콩쥐팥쥐전" },
  { id: 8, title: "선녀와 나무꾼" },
  { id: 9, title: "호랑이와 곶감" },
  { id: 10, title: "흥부와 놀부" },
  { id: 11, title: "토끼와 거북이" },
  { id: 12, title: "흥부와 놀부" },
  { id: 13, title: "토끼와 거북이" },
]

export default function BookSection() {
  return (
    <div className="mb-10">
      <div>
        <h2 className="text-m mb-4 font-semibold">서양 고전 동화</h2>
        <div className="flex gap-4 overflow-x-auto">
          {westernBooks.map((book) => (
            <div key={book.id} className="flex flex-col items-center">
              <div className="h-[200px] w-[140px] rounded-md bg-gray-200" />
              <span className="mt-4 text-sm">{book.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-m mt-10 mb-4 font-semibold">한국 전래 동화</h2>
        <div className="flex gap-4 overflow-x-auto">
          {koreanBooks.map((book) => (
            <div key={book.id} className="flex flex-col items-center">
              <div className="h-[200px] w-[140px] rounded-md bg-gray-200" />
              <span className="mt-4 text-sm">{book.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
