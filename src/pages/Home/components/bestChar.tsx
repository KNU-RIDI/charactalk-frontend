const bestCharacters = [
  { id: 1, name: "신데렐라", englishName: "Cinderella", imageUrl: "/images/cinderella.jpg" },
  { id: 2, name: "백설공주", englishName: "Snow White", imageUrl: "/images/snowwhite.jpg" },
  { id: 3, name: "벨", englishName: "Beauty and the Beast", imageUrl: "/images/bell.jpg" },
  { id: 4, name: "피노키오", englishName: "Pinocchio", imageUrl: "/images/pinocchio.jpg" },
  { id: 5, name: "라푼젤", englishName: "Rapunzel", imageUrl: "/images/rapunzel.jpg" },
  { id: 6, name: "산신령", englishName: "The Honest Woodcutter", imageUrl: "/images/god.jpg" },
  {
    id: 7,
    name: "앨리스",
    englishName: "Alice in Wonderland",
    imageUrl: "/images/alice.jpg",
  },
  { id: 8, name: "토끼", englishName: "The Tortoise and the Hare", imageUrl: "/images/hare.png" },
  { id: 9, name: "놀부", englishName: "Heungbu & Nolbu", imageUrl: "/images/nolbu.jpg" },
]

export default function BestCharacters() {
  return (
    <div className="mb-10">
      <h2 className="text-m mb-4 font-semibold">오늘의 베스트</h2>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {bestCharacters.map((char, index) => (
          <div key={char.id} className="flex items-center space-x-4">
            <span className="w-4 text-lg font-semibold">{index + 1}</span>
            <img
              src={char.imageUrl}
              alt={char.name}
              className="h-10 w-10 rounded-full border-1 border-gray-300 object-cover"
            />
            <div className="text-sm">
              <div className="font-medium">{char.name}</div>
              <div className="text-gray-500">{char.englishName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
