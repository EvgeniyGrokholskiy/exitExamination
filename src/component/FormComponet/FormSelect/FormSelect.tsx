import React from "react"
import {useAppDispatch} from "../../../Redux/hooks"
import { IFormSelectProps } from "../../../types/types"
import styles from "../FormInput/formInput.module.scss"


const FormSelect: React.FC<IFormSelectProps> = ({
                                                    label,
                                                    value,
                                                    name,
                                                    callback,
                                                    required,
                                                    action
                                                }) => {

    const dispatch = useAppDispatch()

    return (
        <label className={styles.label}>{label}
            <select className={styles.input} value={value} required={required} onChange={callback ? callback : (e) => {
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