import React from "react"
import Report from "./Report/Report"
import {NavLink} from "react-router-dom"
import {setCaseEditMode} from "../Redux/appSlice"
import {ICaseState} from "../Redux/casesSlice"
import styles from "./reportDetails.module.scss"
import ReportEdit from "./ReportEdit/ReportEdit"
import {useAppDispatch, useAppSelector} from "../Redux/hooks"

interface IReportDetailsProps {
    report: ICaseState
}

const ReportDetails: React.FC<IReportDetailsProps> = ({report}) => {

    const isCaseEdit = useAppSelector(state => state.app.isCaseEdit)
    const dispatch = useAppDispatch()

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