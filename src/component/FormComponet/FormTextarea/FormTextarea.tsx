import React from "react"
import styles from "../FormInput/formInput.module.scss"

interface IFormTextareaProps {
    label: string
    name: string
    required: boolean
    value: string
    callback: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const FormTextarea: React.FC<IFormTextareaProps> = ({label, name, required, value, callback}) => {
    return (
        <label className={styles.label}>{label}
            <textarea className={styles.input} name={name} value={value}
                      required={required}
                      onChange={callback}/>
        </label>
    )
}

export default FormTextarea