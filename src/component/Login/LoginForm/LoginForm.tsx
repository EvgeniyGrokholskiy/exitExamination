import React, {useState} from "react"
import styles from "./loginForm.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput";

interface ILoginFormProps {
    login: (valueObj: { email: string, password: string }) => void
}

const LoginForm: React.FC<ILoginFormProps> = ({login}) => {

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState(((prevState) => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
        }))
    }

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={(e) => {
            e.preventDefault()
            login(formState)
        }}>
            <FormInput label={"Электронная почта:"} type={"email"} name={"email"} required={true}
                       value={formState.email}
                       callback={handleChange}/>
            <FormInput label={"Пароль:"} type={"password"} name={"password"} required={true}
                       value={formState.password}
                       callback={handleChange}/>
            <button>Войти</button>
        </form>
    )
}

export default LoginForm