import React from "react"
import stales from "./login.module.scss"
import {Navigate} from "react-router-dom"
import LoginForm from "./LoginForm/LoginForm"
import {showLogin} from "../../Redux/appSlice"
import SignUpForm from "./SignUpForm/SignUpForm"
import {changeAuthValue} from "../../Redux/authSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getAuthIsLogin, getIsShowLogin} from "../../Redux/selectors"


const Login: React.FC = () => {

    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(getAuthIsLogin)
    const isShowLogin = useAppSelector(getIsShowLogin)

    const tabToggle = () => {
        dispatch(showLogin(!isShowLogin))
        dispatch(changeAuthValue({fieldName: "error", value: ""}))
    }

    return (
        <>
            {
                isShowLogin ? <h1>Страница авторизации</h1> : <h1>Страница регистрации</h1>
            }
            <div className={stales.wrapper}>
                <div className={`${isShowLogin && stales.tab_login__active} ${stales.tab_login}`}
                     onClick={tabToggle}>{"Авторизация"}
                </div>
                <div className={`${!isShowLogin && stales.tab_signIn__active} ${stales.tab_signIn}`}
                     onClick={tabToggle}>{"Регистрация"}
                </div>
                <div className={stales.formContainer}>
                    {
                        isShowLogin ? <LoginForm/> : <SignUpForm/>
                    }
                </div>
                {
                    isLogin && <Navigate to={"/"}/>
                }
            </div>
        </>
    )
}

export default Login