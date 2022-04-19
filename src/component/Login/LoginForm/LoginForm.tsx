import React, {FormEvent, useState} from "react"
import styles from "./loginForm.module.scss"

interface ILoginFormProps {
    login: (valueObj: { email: string, password: string }) => void
}

const LoginForm: React.FC<ILoginFormProps> = ({login}) => {

    const [formState, setFormState] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(((prevState) => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
        }))
    }

    return (
        <form name={"loginForm"} className={styles.form_wrapper} onSubmit={(e)=>{
            e.preventDefault()
            login(formState)
        }}>
            <label className={styles.label}>Электронная почта:
                <input className={styles.input} name={"email"} type={"email"} value={formState.email} required={true} onChange={handleChange}/>
            </label>
            <label className={styles.label}>Пароль:
                <input className={styles.input} name={"password"} type={"password"} value={formState.password} required={true} onChange={handleChange}/>
            </label>
            <button>Войти</button>
        </form>
    )
}

export default LoginForm