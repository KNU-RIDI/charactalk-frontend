import axios from "axios"

export const api = () => {
  axios.defaults.withCredentials = true

  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const apiWithToken = () => {
  const token = localStorage.getItem("accessToken")
  axios.defaults.withCredentials = true

  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}
