import { useNavigate } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
  const navigate = useNavigate()

  /* 로그인 나중에 수정 */
  const handleClick = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      navigate("/my-page")
    } else {
      window.location.href =
        "https://api.charactalk.site/auth/login/google?redirect=http://localhost:3000"
    }
  }

  return (
    <button onClick={handleClick}>
      <Avatar className="h-36px w-36px cursor-pointer">
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
