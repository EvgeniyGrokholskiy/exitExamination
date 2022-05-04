import React from "react"
import {useAppDispatch} from "../../../Redux/hooks"
import styles from "../FormInput/formInput.module.scss"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"

interface IFormStateSelect {
    label: string
    value: string
    name: string
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }, string>
}

const FormStatesSelect: React.FC<IFormStateSelect> = ({label, value, name, callback, action}) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <select className={styles.input} value={value} onChange={callback ? callback : (e) => {
                const fieldName = name
                const value = e.target.value
                action && dispatch(action({fieldName, value}))
            }}>
                <option value={"new"}>Новое</option>
                <option value={"in_progress"}>В процессе</option>
                <option value={"done"}>Закрыто</option>
            </select>
        </label>
    )
}

export default FormStatesSelect;