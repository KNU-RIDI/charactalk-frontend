import Layout from "@/components/Sidebar/layout"
import Profile from "@/components/profile"

const bestCharacters = [
  { id: 1, name: "신데렐라", englishName: "Cinderella" },
  { id: 2, name: "백설공주", englishName: "Snow White" },
  { id: 3, name: "벨", englishName: "Beauty and the Beast" },
  { id: 4, name: "피노키오", englishName: "Pinocchio" },
  { id: 5, name: "라푼젤", englishName: "Rapunzel" },
  { id: 6, name: "삼신령", englishName: "The Honest Woodcutter" },
  { id: 7, name: "베짱이", englishName: "The Ant and the Grasshopper" },
  { id: 8, name: "토끼", englishName: "The Tortoise and the Hare" },
  { id: 9, name: "놀부", englishName: "Heungbu & Nolbu" },
]

export default function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 right-4 z-10">
        <Profile></Profile>
      </div>
      <Layout>
        <div className="w-full px-6">
          <h1 className="mb-6 text-xl font-bold text-blue-600">CharacTalk</h1>
          {/* 오늘의 베스트 */}
          <div className="mb-10">
            <h2 className="text-m mb-4 font-semibold">오늘의 베스트</h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              {bestCharacters.map((char, index) => (
                <div key={char.id} className="flex items-center space-x-4">
                  <span className="w-4 text-lg font-semibold">{index + 1}</span>
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="text-sm">
                    <div className="font-medium">{char.name}</div>
                    <div className="text-gray-500">{char.englishName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
