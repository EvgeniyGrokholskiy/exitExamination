import React from "react"
import styles from "../FormInput/formInput.module.scss"
import {useAppDispatch} from "../../redux/hooks"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface IFormSelectProps {
    label: string
    type: string
    name: string
    required: boolean
    value: string
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean }, string>
}

const FormSelect: React.FC<IFormSelectProps> = ({
                                                    label,
                                                    type,
                                                    name,
                                                    required,
                                                    value,
                                                    callback,
                                                    action
                                                }) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <select className={styles.input} onChange={callback ? callback : (e) => {
                const fieldName = "type"
                const value = e.target.value
                action && dispatch(action({fieldName, value}))
            }}>
                <option value={"sport"}>Sport</option>
                <option value={"general"}>General</option>
            </select>
        </label>
    )
}

export default FormSelect