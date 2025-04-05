import axios from "axios"

export const api = () => {
  axios.defaults.withCredentials = true

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const apiWithToken = () => {
  const token = localStorage.getItem("accessToken")
  axios.defaults.withCredentials = true

  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}
