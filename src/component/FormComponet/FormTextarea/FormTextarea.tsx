import React from "react"
import {useAppDispatch} from "../../../Redux/hooks"
import {IFormTextareaProps} from "../../../types/types"
import styles from "../FormInput/formInput.module.scss"


const FormTextarea: React.FC<IFormTextareaProps> = ({label, name, required, value, callback, action}) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <textarea className={styles.input} name={name} value={value ? value.toString() : ""}
                      required={required}
                      onChange={callback ? callback : (e) => {
                          const fieldName = e.target.name
                          const value = e.target.value
                          action && dispatch(action({fieldName, value}))
                      }}/>
        </label>
    )
}

export default FormTextarea