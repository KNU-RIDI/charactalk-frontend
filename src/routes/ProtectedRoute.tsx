import { Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  console.log("ProtectedRoute 렌더링됨")
  return <Outlet />
}

export default ProtectedRoute
