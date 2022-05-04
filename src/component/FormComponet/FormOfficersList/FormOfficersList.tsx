import React from "react"
import styles from "./formOfficersList.module.scss"
import {getAllOfficers} from "../../../Redux/selectors"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"

interface IFormOfficersListProps {
    label: string
    value: string
    name: string
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }, string>
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void
}

const FormOfficersList: React.FC<IFormOfficersListProps> = ({label, value, name, callback, action}) => {

    const dispatch = useAppDispatch()
    const officersArray = useAppSelector(getAllOfficers)
    const approvedOfficers = officersArray.filter((officer) => officer.approved)

    return (
        <label className={styles.label}>{label}
            <select className={styles.select} required={true} value={value} onChange={callback ? callback : (event) => {
                const fieldName = name
                const value = event.target.value ? event.target.value : null
                action && dispatch(action({fieldName, value}))
            }}>
                <option value={undefined}>Выберите ответственного сотрудника</option>
                {
                    approvedOfficers.map((officer) => {
                        return <option key={officer._id} value={officer._id}>{`${officer.firstName} ${officer.lastName}`}</option>
                    })
                }
            </select>
        </label>
    )
}

export default FormOfficersList