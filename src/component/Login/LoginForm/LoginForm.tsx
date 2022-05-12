import React, {FormEvent} from "react"
import Loader from "../../Loader/Loader"
import styles from "./loginForm.module.scss"
import MyButton from "../../MyButton/MyButton";
import FormInput from "../../FormComponet/FormInput/FormInput"
import {changeAuthValue, signIn} from "../../../Redux/authSlice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"


const LoginForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const {error, status, email, password, isNewUser} = useAppSelector(state => state.auth)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(signIn({email, password}))
    }

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={handleSubmit}>
            {
                isNewUser && <h3>Успешно создан новый пользователь. <br/> Вы можете войти с новыми данными.</h3>
            }
            {
                status === "loading" && <Loader/>
            }
            <FormInput label={"Электронная почта*:"} type={"email"} name={"email"} required={true}
                       value={email}
                       action={changeAuthValue}
            />
            <FormInput label={"Пароль*:"} type={"password"} name={"password"} required={true}
                       value={password}
                       action={changeAuthValue}
            />
            <MyButton>Войти</MyButton>
            {
                error && <h2 className={styles.error}>{error}</h2>
            }
        </form>
    )
}

export default LoginForm