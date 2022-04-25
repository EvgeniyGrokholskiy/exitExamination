import styles from "./signUpForm.module.scss"
import React, {FormEvent, useState} from "react"
import FormInput from "../../FormComponet/FormInput/FormInput";
import {useAppSelector} from "../../redux/hooks";
import {changeValue} from "../../redux/authReducer";

interface ISignUpFormProps {
    login: (valueObj: { firstName: string, lastName: string, email: string, password: string }) => void
}

const SignUpForm: React.FC<ISignUpFormProps> = ({login}) => {

    const {firstName, lastName, email, password} = useAppSelector(state => state.auth)

    return (
        <form className={styles.form_wrapper} onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            //login(formState)
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