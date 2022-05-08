import React from "react"
import styles from "./formOfficersList.module.scss"
import {getAllOfficers} from "../../../Redux/selectors"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import { IFormOfficersListProps } from "../../../types/types"


const FormOfficersList: React.FC<IFormOfficersListProps> = ({label, value, name, callback, action, required}) => {

    const dispatch = useAppDispatch()
    const officersArray = useAppSelector(getAllOfficers)
    const approvedOfficers = officersArray.filter((officer) => officer.approved)

    return (
        <label className={styles.label}>{label}
            <select className={styles.select} required={required} value={value} onChange={callback ? callback : (event) => {
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