import React from "react"
import {getIsEdit, ICaseState, setEditMode} from "../redux/casesSlice"
import styles from "./reportDetails.module.scss"
import Report from "./Report/Report";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import ReportEdit from "./ReportEdit/ReportEdit";
import {casesApi} from "../../api/api";

interface IReportDetailsProps {
    report: ICaseState
}

const ReportDetails: React.FC<IReportDetailsProps> = ({report}) => {

    const isEdit = useAppSelector(getIsEdit)
    const dispatch = useAppDispatch()

    const handleChangeClick = () => {
        const bearer = localStorage.getItem("bearer")
        !isEdit && dispatch(setEditMode(true))
        if (isEdit) {
            dispatch(setEditMode(false))
            bearer && casesApi.editCase(bearer, report._id, report).then((response) => console.log(response))
        }
        /*isEdit && dispatch(setEditMode(false))*/
    }

    return (
        <div className={styles.wrapper}>
            {
                <button onClick={handleChangeClick}>
                    {
                        isEdit ? "Сохранить" : "Редактировать"
                    }
                </button>
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