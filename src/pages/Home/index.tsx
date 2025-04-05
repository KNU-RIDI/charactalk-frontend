import Layout from "@/components/Sidebar/layout"
import Profile from "@/components/profile"

export default function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 right-4 z-50">
        <Profile />
      </div>

      <Layout>
        <div></div>
      </Layout>
    </div>
  )
}
