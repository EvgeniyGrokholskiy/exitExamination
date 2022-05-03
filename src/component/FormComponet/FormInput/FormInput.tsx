import React from "react"
import styles from "./formInput.module.scss"
import {useAppDispatch} from "../../Redux/hooks"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface IFormInputProps {
    label: string
    type: string
    name: string
    required: boolean
    value: string
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }, string>
}

const FormInput: React.FC<IFormInputProps> = ({
                                                  label,
                                                  type,
                                                  name,
                                                  required,
                                                  value,
                                                  callback,
                                                  action = ({fieldName, value}) => ({type: "", payload: {fieldName, value}})
                                              }) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <input className={styles.input} type={type} name={name} value={value}
                   required={required}
                   onChange={callback ? callback : (e) => {
                       const fieldName = e.target.name
                       const value = e.target.value
                       dispatch(action({fieldName, value}))
                   }}/>
        </label>
    )
}

export default FormInput