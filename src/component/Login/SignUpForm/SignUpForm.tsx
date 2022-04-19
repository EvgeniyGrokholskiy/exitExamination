import React, {FormEvent, useState} from "react"
import styles from "./signUpForm.module.scss"

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            <label className={styles.label}>Имя:
                <input className={styles.input} name={"firstName"} type={"text"} value={formState.firstName}
                       required={true}
                       onChange={handleChange}/>
            </label>
            <label className={styles.label}>Фамилия:
                <input className={styles.input} name={"lastName"} type={"text"} value={formState.lastName}
                       required={true} onChange={handleChange}/>
            </label>
            <label className={styles.label}>Почта:
                <input className={styles.input} name={"email"} type={"email"} value={formState.email} required={true}
                       onChange={handleChange}/>
            </label>
            <label className={styles.label}>Пароль:
                <input className={styles.input} name={"password"} type={"password"} value={formState.password}
                       required={true} onChange={handleChange}/>
            </label>
            <button>Зарегистрироваться</button>
        </form>
    )
}

export default SignUpForm