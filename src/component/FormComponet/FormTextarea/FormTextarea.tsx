import React from "react"
import styles from "../FormInput/formInput.module.scss"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../redux/hooks";

interface IFormTextareaProps {
    label: string
    name: string
    required: boolean
    value: string
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean }>
}

const FormTextarea: React.FC<IFormTextareaProps> = ({label, name, required, value, callback, action}) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <textarea className={styles.input} name={name} value={value}
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