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
