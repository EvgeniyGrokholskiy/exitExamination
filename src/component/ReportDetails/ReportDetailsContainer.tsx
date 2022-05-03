import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import ReportDetails from "./ReportDetails"
import {getAllCases} from "../Redux/casesSlice"
import {getLoadingStatus} from "../Redux/selectors"
import {useAppDispatch, useAppSelector} from "../Redux/hooks"

interface IReportDetailsProps {
}

const ReportDetailsContainer: React.FC<IReportDetailsProps> = () => {

    const idFromUrl = useParams()["*"]
    const isLoading = useAppSelector(getLoadingStatus)
    const editCase = useAppSelector(state => state.cases.editCase)
    const dispatch = useAppDispatch()

    useEffect(() => {
        idFromUrl && dispatch(getAllCases(idFromUrl))
    }, [dispatch, idFromUrl])

    return (
        <div>
            {
                isLoading && <Loader/>
            }
            <h2>Детали отчета</h2>
            <ReportDetails report={editCase}/>
        </div>
    )
}

export default ReportDetailsContainer