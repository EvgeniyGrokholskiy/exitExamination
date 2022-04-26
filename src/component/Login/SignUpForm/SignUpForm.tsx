import styles from "./signUpForm.module.scss"
import React, {FormEvent} from "react"
import FormInput from "../../FormComponet/FormInput/FormInput";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeValue} from "../../redux/authReducer";
import {auth} from "../../../api/api";

interface ISignUpFormProps {
    setShowLogin:  React.Dispatch<React.SetStateAction<boolean>>
}

const SignUpForm: React.FC<ISignUpFormProps> = ({setShowLogin}) => {

    const {firstName, lastName, email, password} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    return (
        <form className={styles.form_wrapper} onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            auth.signUp(firstName, lastName, email, password).then((data) => {
                if (data.status === 200) {
                    console.log("200")
                    setShowLogin(true)
                }
            })
        }}>
            <FormInput label={"Имя:"} type={"text"} name={"firstName"} required={true}
                       value={firstName}
                       action={changeValue}
            />
            <FormInput label={"Фамилия:"} type={"text"} name={"lastName"} required={true}
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
        </form>
    )
}

export default SignUpForm