import React from "react"
import styles from "./formInput.module.scss"
import {useAppDispatch} from "../../../Redux/hooks"
import {IFormInputProps} from "../../../types/types"


const FormInput: React.FC<IFormInputProps> = ({
                                                  label,
                                                  type,
                                                  name,
                                                  required,
                                                  checked,
                                                  value,
                                                  action = ({fieldName, value}) => ({
                                                      type: "",
                                                      payload: {fieldName, value}
                                                  })
                                              }) => {

    const dispatch = useAppDispatch()

    const conditionalValue: string = value ? value : ""

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name
        const value = event.target.value
        dispatch(action({fieldName, value}))
    }

    return (
        <label className={checked !== undefined ? `${styles.label} ${styles.checkBox}` : styles.label}>{label}
            {
                checked === undefined &&
                <input className={styles.input} type={type} checked={checked} name={name} value={conditionalValue}
                       required={required}
                       onChange={handleOnChange}/>
            }
            {
                checked !== undefined && <input className={styles.input} type={type} checked={checked} name={name}
                                                required={required}
                                                onChange={handleOnChange}/>
            }
        </label>
    )
}

export default FormInput