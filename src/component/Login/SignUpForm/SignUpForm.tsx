import React, {FormEvent} from "react"
import styles from "./signUpForm.module.scss"
import {showLogin} from "../../../Redux/appSlice"
import {getAuthData} from "../../../Redux/selectors"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {changeAuthValue, signUp} from "../../../Redux/authSlice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"


const SignUpForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const {firstName, lastName, email, password, error} = useAppSelector(getAuthData)

    return (
        <form className={styles.form_wrapper} onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            dispatch(signUp({firstName, lastName, email, password}))
            dispatch(showLogin(true))
        }}>
            <FormInput label={"Имя:"} type={"text"} name={"firstName"} required={false}
                       value={firstName}
                       action={changeAuthValue}
            />
            <FormInput label={"Фамилия:"} type={"text"} name={"lastName"} required={false}
                       value={lastName}
                       action={changeAuthValue}
            />
            <FormInput label={"Почта:"} type={"email"} name={"email"} required={true}
                       value={email}
                       action={changeAuthValue}
            />
            <FormInput label={"Пароль:"} type={"password"} name={"password"} required={true}
                       value={password}
                       action={changeAuthValue}
            />
            <button>Зарегистрироваться</button>
            {
                error && <p className={styles.error_title}>{error}</p>
            }
        </form>
    )
}

export default SignUpForm