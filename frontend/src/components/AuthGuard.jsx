import { useNavigate } from "react-router-dom"
import { useUserStore } from "../store/useUserStore"
import { useEffect } from "react"

export const AuthGuard = () => {
    const {session} = useUserStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session?.token) navigate('/signin!')
    }, [])

    if (!session?.token) return <></>

    return children
}