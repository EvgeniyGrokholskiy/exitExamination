import React from "react"
import {useAppDispatch} from "../../Redux/hooks"
import styles from "../FormInput/formInput.module.scss"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface IFormSelectProps {
    label: string
    value: string
    name: string
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }, string>
}

const FormSelect: React.FC<IFormSelectProps> = ({
                                                    label,
                                                    value,
                                                    name,
                                                    callback,
                                                    action
                                                }) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <select className={styles.input} value={value} onChange={callback ? callback : (e) => {
                const fieldName = name
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