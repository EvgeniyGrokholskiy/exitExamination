import React, {FormEvent} from "react"
import styles from "./loginForm.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput";
import {useAppSelector} from "../../redux/hooks";
import {changeValue} from "../../redux/authReducer";

interface ILoginFormProps {
    login: (valueObj: { email: string, password: string }) => void
}

const LoginForm: React.FC<ILoginFormProps> = ({login}) => {

    const {email, password} = useAppSelector(state => state.auth)

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            login({email, password})
        }}>
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