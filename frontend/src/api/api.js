import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    //baseURL: "https://api.kitek-pg.ru/api/feedback/",
    baseURL: "https://refactored-space-couscous-g45qwvg95rp72vj5j-3001.app.github.dev/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.getState()

    if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
    }

    return config
})

const registerUser = async (user) => {
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const getMessages = async () => {
    const res = await apiInstance.get("/messages")
    return res
}

const sendMessage = async (message)  => {
    const res = await apiInstance.post("/messages", message)
    return res
}

const authMe = async () => {
    const res = await apiInsance.get("/auth/me")
    return res
}

const deleteMessage = async (id) => {
    const res = await apiInstance.delete (`/messages/${id}`)
    return res
}

const reportMessage = async (id) => {
    const res = await apiInstance.post (`/messages/${id}/report`)
    return res
}

const getStats = async (id) => {
    const res = await apiInstance.get(`/stats`)
    return res
}

const likeMessage = async (id) => {
    const res = await apiInstance.post(`/messages/${id}/like`)
    return res
}

const getMyMessages = async (id) => {
    const res = await apiInstance.get(`/my-messages`)
    return res
}

export const api = {
    registerUser,
    loginUser,
    getMessages,
    sendMessage
}
