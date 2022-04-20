import React from "react"
import styles from "./formInput.module.scss"

interface IFormInputProps {
    label: string
    type: string
    name: string
    required: boolean
    value: string
    callback: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormInput: React.FC<IFormInputProps> = ({label, type, name, required, value, callback}) => {
    return (
        <label className={styles.label}>{label}
            <input className={styles.input} type={type} name={name} value={value}
                   required={required}
                   onChange={callback}/>
        </label>
    )
}

export default FormInput