import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
  return (
    <Avatar className="h-9 w-9 cursor-pointer">
      <AvatarImage
        src="https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08"
        alt="Profile avatar"
        className="object-cover"
      />
    </Avatar>
  )
}

export default Profile
