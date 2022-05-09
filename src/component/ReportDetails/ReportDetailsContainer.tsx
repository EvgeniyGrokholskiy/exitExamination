import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import ReportDetails from "./ReportDetails"
import {getAllCases} from "../../Redux/casesSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getIsCaseEdit, getLoadingStatus} from "../../Redux/selectors"


const ReportDetailsContainer: React.FC = () => {

    const dispatch = useAppDispatch()
    const idFromUrl = useParams()["*"]
    const isCaseEdit = useAppSelector(getIsCaseEdit)
    const isLoading = useAppSelector(getLoadingStatus)

    useEffect(() => {
        idFromUrl && dispatch(getAllCases(idFromUrl))
    }, [dispatch, idFromUrl])

    return (
        <div>
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