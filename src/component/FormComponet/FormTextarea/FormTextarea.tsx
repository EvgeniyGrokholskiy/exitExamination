import React from "react"
import {useAppDispatch} from "../../../Redux/hooks"
import {IFormTextareaProps} from "../../../types/types"
import styles from "../FormInput/formInput.module.scss"


const FormTextarea: React.FC<IFormTextareaProps> = ({label, name, required, value, callback, action}) => {

    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const fieldName = event.target.name
        const value = event.target.value
        action && dispatch(action({fieldName, value}))
    }

    return (
        <label className={styles.label}>{label}
            <textarea className={styles.input} name={name} value={value ? value.toString() : ""}
                      required={required}
                      onChange={callback ? callback : handleChange}/>
        </label>
    )
}

export default FormTextarea