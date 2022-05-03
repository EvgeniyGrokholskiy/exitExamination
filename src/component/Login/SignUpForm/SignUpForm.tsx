import React, {FormEvent} from "react"
import styles from "./signUpForm.module.scss"
import {changeAuthValue, signUp} from "../../Redux/authSlice"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getAuthData} from "../../Redux/selectors";
import {showLogin} from "../../Redux/appSlice";

interface ISignUpFormProps {
}

const SignUpForm: React.FC<ISignUpFormProps> = () => {

    const {firstName, lastName, email, password, error} = useAppSelector(getAuthData)
    const dispatch = useAppDispatch()

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