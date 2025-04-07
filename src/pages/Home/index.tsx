import Layout from "@/components/Sidebar/layout"
import Profile from "@/components/Profile"

export default function Home() {
  return (
    <div className="relative h-full w-full">
      {/* 프로필 컴포넌트 */}
      <div className="flex justify-end pt-4 pr-4">
        <Profile></Profile>
      </div>

      <Layout>
        <div></div>
      </Layout>
    </div>
  )
}
