import Profile from "@/components/Profile"
import BestCharacters from "./components/bestChar"
import BookSection from "./components/Book"
import Search from "@/components/Search"
import Sidebar from "@/components/Sidebar/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-[#1E9EFF]">CharacTalk</h1>
          <div className="flex items-center gap-4">
            <Search />
            <Profile />
          </div>
        </div>

        <BestCharacters />
        <BookSection />
      </div>
    </div>
  )
}
