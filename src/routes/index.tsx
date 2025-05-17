import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import HomePage from "../pages/Home"
import ChatPage from "../pages/Chat"
import LoginPage from "../pages/Login"
import SignUpPage from "../pages/SignUp"
import MyPage from "../pages/MyPage"
import { RouterPath } from "./path"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <HomePage />,
  },
  {
    path: RouterPath.chat,
    element: <ProtectedRoute />,
    children: [
      {
        path: RouterPath.chat,
        element: <ChatPage />,
      },
    ],
  },
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
  {
    path: RouterPath.signUp,
    element: <SignUpPage />,
  },
  {
    path: RouterPath.myPage,
    element: <ProtectedRoute />,
    children: [
      {
        path: RouterPath.myPage,
        element: <MyPage />,
      },
    ],
  },
  {
    path: RouterPath.notFound,
    element: <Navigate to={RouterPath.root} />,
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
