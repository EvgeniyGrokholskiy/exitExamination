import React, {useEffect} from "react"
import styles from "./formOfficersList.module.scss"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit"
import {getAllOfficersArray} from "../../redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../redux/hooks"

interface IFormOfficersListProps {
    label: string
    value: string
    name: string
    callback?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void
    action?: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean }, string>
}

const FormOfficersList: React.FC<IFormOfficersListProps> = ({label, value, name, callback, action}) => {

    const officersArray = useAppSelector(state => state.officers.officersArray)
    const approvedOfficers = officersArray.filter((officer) => officer.approved)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllOfficersArray())
    }, [dispatch])

    return (
        <label className={styles.label}>{label}
            <select className={styles.select} value={value} onChange={callback ? callback : (event) => {
                const fieldName = name
                const value = event.target.value
                action && dispatch(action({fieldName, value}))
            }}>
                <option disabled={true}>Выберите ответственного сотрудника</option>
                {
                    approvedOfficers.map((officer) => {
                        return <option>{`${officer.firstName} ${officer.lastName}`}</option>
                    })
                }
            </select>
        </label>
    )
}

export default FormOfficersList