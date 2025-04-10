import Layout from "@/components/Sidebar/layout"
import Profile from "@/components/profile"
import BestCharacters from "./components/bestChar"
import BookSection from "./components/Book"

export default function Home() {
  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      <div className="absolute top-4 right-4 z-10">
        <Profile></Profile>
      </div>
      <Layout>
        <div className="w-full px-6">
          <h1 className="mb-6 text-xl font-bold" style={{ color: "#1E9EFF" }}>
            CharacTalk
          </h1>
          <BestCharacters></BestCharacters>
          <BookSection></BookSection>
        </div>
      </Layout>
    </div>
  )
}
