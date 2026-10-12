import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api/api"



const SignUp = () => {
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (e.target.password.value !== e.target.password2.value) {
            setError("Пароли не совпадают")
            return
        }

        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }

        try {
            const data = await api.registerUser(user)
            setSession(data.data)
            navigate("/")
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
        }
    }
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Регистрация</h1>
                {error.length > 0 && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        name="username"
                        minlegth={5}
                        maxlegth={15}
                        type="text"
                        label="Имя пользователя"
                        required
                        placeholder="Введите имя пользователя"
                    />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Почта"
                        minlegth={6}
                        maxlegth={40}
                        required
                        placeholder="Введите почту"
                    />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        minlegth={4}
                        maxlegth={40}
                        label="Пароль"
                        required
                        placeholder="Введите пароль"
                    />
                    <Input
                        id="password2"
                        name="password2"
                        type="password"
                        label="Подтверждение пароля"
                        required
                        placeholder="Подтвердите пароль"
                    />
                    <Button>Зарегистрироваться</Button>
                </form>
                <div className="auth-footer">
                    <p>
                        <Link to={"/signin"}>Вход</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
