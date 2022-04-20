import React, {FormEvent, useState} from "react"
import styles from "./signUpForm.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput";

interface ISignUpFormProps {
    login: (valueObj: { firstName: string, lastName: string, email: string, password: string }) => void
}

const SignUpForm: React.FC<ISignUpFormProps> = ({login}) => {

    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState((prevState => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
        }))
    }


    return (
        <form className={styles.form_wrapper} onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            login(formState)
        }}>
            <FormInput label={"Имя:"} type={"text"} name={"firstName"} required={true}
                       value={formState.firstName}
                       callback={handleChange}/>
            <FormInput label={"Фамилия:"} type={"text"} name={"lastName"} required={true}
                       value={formState.lastName}
                       callback={handleChange}/>
            <FormInput label={"Почта:"} type={"email"} name={"email"} required={true}
                       value={formState.email}
                       callback={handleChange}/>
            <FormInput label={"Пароль:"} type={"password"} name={"password"} required={true}
                       value={formState.password}
                       callback={handleChange}/>
            <button>Зарегистрироваться</button>
        </form>
    )
}

export default SignUpForm