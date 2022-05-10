import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import {useParams} from "react-router-dom"
import {getAllCases} from "../../../Redux/casesSlice"
import styles from "./ReportDetailContainer.module.scss"
import ReportDetails from "../ReportDetail/ReportDetails"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getIsCaseEdit, getLoadingStatus} from "../../../Redux/selectors"


const ReportDetailsContainer: React.FC = () => {

    const dispatch = useAppDispatch()
    const idFromUrl = useParams()["*"]
    const isCaseEdit = useAppSelector(getIsCaseEdit)
    const isLoading = useAppSelector(getLoadingStatus)

    useEffect(() => {
        idFromUrl && dispatch(getAllCases(idFromUrl))
    }, [dispatch, idFromUrl])

    return (
        <div className={styles.wrapper}>
            {
                isLoading && <Loader/>
            }
            {
                isCaseEdit ? <h2>Редактирование отчета</h2> : <h2>Детали отчета</h2>
            }
            <ReportDetails/>
        </div>
    )
}

export default ReportDetailsContainer