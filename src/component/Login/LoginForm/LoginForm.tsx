import React, {FormEvent} from "react"
import Loader from "../../Loader/Loader"
import styles from "./loginForm.module.scss"
import {changeAuthValue, signIn} from "../../redux/authSlice"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"

interface ILoginFormProps {
}

const LoginForm: React.FC<ILoginFormProps> = () => {

    const {error, status, email, password, isNewUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(signIn({email, password}))
        }}>
            {
                isNewUser && <h3>Успешно создан новый пользователь. <br/> Вы можете войти с новыми данными.</h3>
            }
            {
                status === "loading" && <Loader/>
            }
            <FormInput label={"Электронная почта:"} type={"email"} name={"email"} required={true}
                       value={email}
                       action={changeAuthValue}
            />
            <FormInput label={"Пароль:"} type={"password"} name={"password"} required={true}
                       value={password}
                       action={changeAuthValue}
            />
            <button>Войти</button>
            {
                error && <h2 className={styles.error}>{error}</h2>
            }
        </form>
    )
}

export default LoginForm