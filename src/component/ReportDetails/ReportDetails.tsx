import React from "react"
import Report from "./Report/Report"
import {NavLink} from "react-router-dom"
import MyButton from "../MyButton/MyButton"
import styles from "./reportDetails.module.scss"
import ReportEdit from "./ReportEdit/ReportEdit"
import {setCaseEditMode} from "../../Redux/appSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getEdinCase, getIsCaseEdit, getIsLoggedInUserApproved} from "../../Redux/selectors"


const ReportDetails: React.FC = () => {

    const dispatch = useAppDispatch()
    const report = useAppSelector(getEdinCase)
    const isCaseEdit = useAppSelector(getIsCaseEdit)
    const isLoggedUserApproved = useAppSelector(getIsLoggedInUserApproved)

    const conditionalRender = isLoggedUserApproved && !isCaseEdit

    return (
        <div className={styles.wrapper}>
            <div className={styles.button_block}>
                {
                    !isCaseEdit && <NavLink className={styles.back_button} to={"/reports-list"}>Назад</NavLink>
                }
                {
                    conditionalRender &&
                    <MyButton callback={() => dispatch(setCaseEditMode(true))}>Редактировать</MyButton>
                }
            </div>
            {
                isCaseEdit
                    ? <ReportEdit report={report}/>
                    : <Report report={report}/>
            }
        </div>
    )
}

export default ReportDetails