import React from "react"
import stales from "./login.module.scss"
import {Navigate} from "react-router-dom"
import LoginForm from "./LoginForm/LoginForm"
import SignUpForm from "./SignUpForm/SignUpForm"
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getAppData} from "../redux/selectors";
import {showLogin} from "../redux/appSlice";
import {changeAuthValue} from "../redux/authSlice";

interface ILoginProps {
    isLogin: boolean | undefined
}

const Login: React.FC<ILoginProps> = ({isLogin}) => {

    const {isShowLogin} = useAppSelector(getAppData)
    const dispatch = useAppDispatch()

    return (
        <div className={stales.wrapper}>
            <div className={`${isShowLogin && stales.tab_login__active} ${stales.tab_login}`}
                 onClick={() => {
                     dispatch(showLogin(true))
                     dispatch(changeAuthValue({fieldName: "error", value: ""}))
                 }}>Авторизация
            </div>
            <div className={`${!isShowLogin && stales.tab_signIn__active} ${stales.tab_signIn}`}
                 onClick={() => {
                     dispatch(showLogin(false))
                     dispatch(changeAuthValue({fieldName: "error", value: ""}))
                 }}>Регистрация
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
    )
}

export default Login