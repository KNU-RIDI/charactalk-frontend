import { useNavigate } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

const Profile = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"))
  }, [])
  const handleClick = () => {
    if (token) {
      navigate("/my-page")
    } else {
      window.location.href =
        "https://api.charactalk.site/auth/login/google?redirect=http://localhost:3000"
    }
  }

  return (
    <button onClick={handleClick}>
      <Avatar className="h-9 w-9 cursor-pointer">
        <AvatarImage
          src="https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08"
          alt="Profile avatar"
          className="object-cover"
        />
      </Avatar>
    </button>
  )
}

export default Profile
