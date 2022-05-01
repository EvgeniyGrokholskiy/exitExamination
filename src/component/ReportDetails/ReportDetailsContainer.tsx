import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import ReportDetails from "./ReportDetails"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {getAllCases, getCasesArray, getLoadingStatus, setCaseToEdit} from "../redux/casesSlice"

interface IReportDetailsProps {
}

const ReportDetailsContainer: React.FC<IReportDetailsProps> = () => {

    const idFromUrl = useParams()["*"]
    const isLoading = useAppSelector(getLoadingStatus)
    const allCases = useAppSelector(getCasesArray)
    const editCase = useAppSelector(state => state.cases.editCase)
    const dispatch = useAppDispatch()

    useEffect(() => {
        idFromUrl && dispatch(getAllCases())
    }, [dispatch, idFromUrl])

    const report = allCases.filter((item) => item._id === idFromUrl)

    report[0] && dispatch(setCaseToEdit(report[0]))

    return (
        <div>
            {
                isLoading && <Loader/>
            }
            <h2>Детали отчета</h2>
            {
                report && <ReportDetails report={editCase}/>
            }

        </div>
    )
}

export default ReportDetailsContainer