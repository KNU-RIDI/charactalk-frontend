import axios from "axios"

export const fetchInstance = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const fetchInstanceWithToken = () => {
  const token = localStorage.getItem("accessToken")

  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}
