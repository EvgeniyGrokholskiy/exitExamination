import React from "react"
import Report from "./Report/Report"
import {NavLink} from "react-router-dom"
import styles from "./reportDetails.module.scss"
import ReportEdit from "./ReportEdit/ReportEdit"
import {setCaseEditMode} from "../../Redux/appSlice"
import {getEdinCase, getIsCaseEdit} from "../../Redux/selectors"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"


const ReportDetails: React.FC = () => {

    const dispatch = useAppDispatch()
    const report = useAppSelector(getEdinCase)
    const isCaseEdit = useAppSelector(getIsCaseEdit)

    return (
        <div className={styles.wrapper}>
            {
                !isCaseEdit && <NavLink className={styles.back_button} to={"/reports-list"}>Назад</NavLink>
            }
            {
                !isCaseEdit && <button onClick={() => dispatch(setCaseEditMode(true))}>Редактировать</button>
            }
            {
                isCaseEdit
                    ? <ReportEdit report={report}/>
                    : <Report report={report}/>
            }
        </div>
    )
}

export default ReportDetails