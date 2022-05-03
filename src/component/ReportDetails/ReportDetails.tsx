import React from "react"
import Report from "./Report/Report"
import {NavLink} from "react-router-dom"
import {setEditMode} from "../Redux/appSlice"
import {ICaseState} from "../Redux/casesSlice"
import styles from "./reportDetails.module.scss"
import ReportEdit from "./ReportEdit/ReportEdit"
import {useAppDispatch, useAppSelector} from "../Redux/hooks"

interface IReportDetailsProps {
    report: ICaseState
}

const ReportDetails: React.FC<IReportDetailsProps> = ({report}) => {

    const isEdit = useAppSelector(state => state.app.isEdit)
    const dispatch = useAppDispatch()

    return (
        <div className={styles.wrapper}>
            {
                !isEdit && <NavLink className={styles.back_button} to={"/reports-list"}>Назад</NavLink>
            }
            {
                !isEdit && <button onClick={() => dispatch(setEditMode(true))}>Редактировать</button>
            }
            {
                isEdit
                    ? <ReportEdit report={report}/>
                    : <Report report={report}/>
            }
        </div>
    )
}

export default ReportDetails