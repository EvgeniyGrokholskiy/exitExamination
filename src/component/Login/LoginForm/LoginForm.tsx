import React, {FormEvent} from "react"
import styles from "./loginForm.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeValue, setIsLogin} from "../../redux/authReducer";
import {auth} from "../../../api/api";

interface ILoginFormProps {
    login: () => void
}

const LoginForm: React.FC<ILoginFormProps> = ({login}) => {

    const {email, password} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            auth.signIn(email, password).then((response) => {
                if (response.status === 200) {
                    debugger
                    dispatch(changeValue({fieldName:"bearer",value:response.data.data.token}))
                    dispatch(setIsLogin(true))
                }
            })
            //login()
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