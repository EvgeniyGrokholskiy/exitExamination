import React, {FormEvent} from "react"
import styles from "./signUpForm.module.scss"
import {changeValue, signUp} from "../../redux/authSlice"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"
import {getAuthData} from "../../redux/selectors";
import {showLogin} from "../../redux/appSlice";

interface ISignUpFormProps {
}

const SignUpForm: React.FC<ISignUpFormProps> = () => {

    const {firstName, lastName, email, password, error} = useAppSelector(getAuthData)
    const dispatch = useAppDispatch()

    return (
        <form className={styles.form_wrapper} onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            // @ts-ignore
            dispatch(signUp({firstName, lastName, email, password}))
            dispatch(showLogin(true))
        }}>
            <FormInput label={"Имя:"} type={"text"} name={"firstName"} required={false}
                       value={firstName}
                       action={changeValue}
            />
            <FormInput label={"Фамилия:"} type={"text"} name={"lastName"} required={false}
                       value={lastName}
                       action={changeValue}
            />
            <FormInput label={"Почта:"} type={"email"} name={"email"} required={true}
                       value={email}
                       action={changeValue}
            />
            <FormInput label={"Пароль:"} type={"password"} name={"password"} required={true}
                       value={password}
                       action={changeValue}
            />
            <button>Зарегистрироваться</button>
            {
                error && <p className={styles.error_title}>{error}</p>
            }
        </form>
    )
}

export default SignUpForm