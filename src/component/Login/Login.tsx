import React, {useState} from "react"
import stales from "./login.module.scss"
import {Navigate} from "react-router-dom";

interface ILoginProps {
    isLogin: boolean
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
            <label className={stales.login}>Логин:
                <input name={"login"}/>
            </label>
            <label className={stales.password}>Пароль:
                <input name={"password"}/>
            </label>

            <button className={stales.button} onClick={login}>
                {
                    showLogin
                        ? "Вход"
                        : "Регистрация"
                }
            </button>
            {
                isLogin && <Navigate to={"/"}/>
            }
        </div>
    )
}

export default Login