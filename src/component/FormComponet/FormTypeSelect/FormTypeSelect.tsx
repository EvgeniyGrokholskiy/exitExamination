import React from "react"
import {useAppDispatch} from "../../../Redux/hooks"
import {IFormSelectProps} from "../../../types/types"
import styles from "../FormInput/formInput.module.scss"


const FormTypeSelect: React.FC<IFormSelectProps> = ({
                                                    label,
                                                    value,
                                                    name,
                                                    required,
                                                    action
                                                }) => {

    const dispatch = useAppDispatch()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = name
        const value = event.target.value
        action && dispatch(action({fieldName, value}))
    }

    return (
        <label className={styles.label}>{label}
            <select className={styles.input} value={value} required={required}
                    onChange={handleChange}>
                <option value={"sport"}>Sport</option>
                <option value={"general"}>General</option>
            </select>
        </label>
    )
}

export default FormTypeSelect