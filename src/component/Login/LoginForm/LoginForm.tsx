import React, {FormEvent} from "react"
import styles from "./loginForm.module.scss"
import {changeValue, signIn} from "../../redux/authSlice"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"

interface ILoginFormProps {
}

const LoginForm: React.FC<ILoginFormProps> = () => {

    const {email, password, isNewUser} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            // @ts-ignore
            dispatch(signIn({email, password}))
        }}>
            {
                isNewUser && <h3>Успешно создан новый пользователь. <br/> Вы можете войти с новыми данными.</h3>
            }
            <FormInput label={"Электронная почта:"} type={"email"} name={"email"} required={true}
                       value={email}
                       action={changeValue}
            />
            <FormInput label={"Пароль:"} type={"password"} name={"password"} required={true}
                       value={password}
                       action={changeValue}
            />
            <button>Войти</button>
        </form>
    )
}

export default LoginForm