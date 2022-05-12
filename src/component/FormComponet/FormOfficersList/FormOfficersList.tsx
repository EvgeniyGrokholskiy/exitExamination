import React from "react"
import styles from "./formOfficersList.module.scss"
import {getAllOfficers} from "../../../Redux/selectors"
import { IFormOfficersListProps } from "../../../types/types"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"


const FormOfficersList: React.FC<IFormOfficersListProps> = ({label, value, name, action, required}) => {

    const dispatch = useAppDispatch()
    const officersArray = useAppSelector(getAllOfficers)
    const approvedOfficers = officersArray.filter((officer) => officer.approved)

    const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const fieldName = name
        const value = event.target.value ? event.target.value : null
        action && dispatch(action({fieldName, value}))
    }

    return (
        <label className={styles.label}>{label}
            <select className={styles.select} required={required} value={value} onChange={handleChange}>
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