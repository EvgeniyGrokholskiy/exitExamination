import React, {useState} from "react"
import stales from "./login.module.scss"
import {Navigate} from "react-router-dom"
import LoginForm from "./LoginForm/LoginForm"
import SignUpForm from "./SignUpForm/SignUpForm"
import {useAppDispatch} from "../redux/hooks";

interface ILoginProps {
    isLogin: boolean | undefined
    login: () => void
}

const Login: React.FC<ILoginProps> = ({isLogin, login}) => {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <div className={stales.wrapper}>
            <div className={`${showLogin && stales.tab_login__active} ${stales.tab_login}`}
                 onClick={() => setShowLogin(true)}>Авторизация
            </div>
            <div className={`${!showLogin && stales.tab_signIn__active} ${stales.tab_signIn}`}
                 onClick={() => setShowLogin(false)}>Регистрация
            </div>
            <div className={stales.formContainer}>
                {
                    showLogin ? <LoginForm login={login}/> : <SignUpForm setShowLogin={setShowLogin}/>
                }
            </div>
            {
                isLogin && <Navigate to={"/"}/>
            }
        </div>
    )
}

export default Login