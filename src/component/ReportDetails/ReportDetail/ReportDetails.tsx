import React from "react"
import Report from "../Report/Report"
import MyLink from "../../MyLink/MyLink"
import MyButton from "../../MyButton/MyButton"
import styles from "./reportDetails.module.scss"
import ReportEdit from "../ReportEdit/ReportEdit"
import {setCaseEditMode} from "../../../Redux/appSlice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getEdinCase, getIsCaseEdit, getIsLoggedInUserApproved} from "../../../Redux/selectors"


const ReportDetails: React.FC = () => {

    const dispatch = useAppDispatch()
    const report = useAppSelector(getEdinCase)
    const isCaseEdit = useAppSelector(getIsCaseEdit)
    const isLoggedUserApproved = useAppSelector(getIsLoggedInUserApproved)

    const conditionalRender = isLoggedUserApproved && !isCaseEdit

    const handleSetEditMode = () => dispatch(setCaseEditMode(true))

    return (
        <div className={styles.wrapper}>
            {
                isCaseEdit
                    ? <ReportEdit report={report}/>
                    : <Report report={report}/>
            }
            <div className={styles.button_block}>
                {
                    conditionalRender &&
                    <MyButton callback={handleSetEditMode}>Редактировать</MyButton>
                }
                {
                    !isCaseEdit && <MyLink link={"/reports-list"}>Назад</MyLink>
                }
            </div>

        </div>
    )
}

export default ReportDetails