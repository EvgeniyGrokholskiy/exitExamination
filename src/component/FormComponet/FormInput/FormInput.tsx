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
                                                  callback,
                                                  action = ({fieldName, value}) => ({
                                                      type: "",
                                                      payload: {fieldName, value}
                                                  })
                                              }) => {

    const dispatch = useAppDispatch()

    const conditionalValue: string = value ? value : ""

    return (
        <label className={checked !== undefined ? `${styles.label} ${styles.checkBox}` : styles.label}>{label}
            {
                checked === undefined &&
                <input className={styles.input} type={type} checked={checked} name={name} value={conditionalValue}
                       required={required}
                       onChange={callback ? callback : (e) => {
                           const fieldName = e.target.name
                           const value = e.target.value
                           dispatch(action({fieldName, value}))
                       }}/>
            }
            {
                checked !== undefined && <input className={styles.input} type={type} checked={checked} name={name}
                                                required={required}
                                                onChange={callback ? callback : (e) => {
                                                    const fieldName = e.target.name
                                                    const value = e.target.checked
                                                    dispatch(action({fieldName, value}))
                                                }}/>
            }
        </label>
    )
}

export default FormInput