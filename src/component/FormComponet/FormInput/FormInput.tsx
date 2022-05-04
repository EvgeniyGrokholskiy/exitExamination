import React from "react"
import styles from "./formInput.module.scss"
import {useAppDispatch} from "../../../Redux/hooks"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface IFormInputProps {
    label: string
    type: string
    name: string
    required: boolean
    checked?: boolean
    value?: string | null
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }, string>
}

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

    const conditionalValue = value ? value : ""

    return (
        <label className={styles.label}>{label}
            {
                checked === undefined && <input className={styles.input} type={type} checked={checked} name={name} value={conditionalValue}
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