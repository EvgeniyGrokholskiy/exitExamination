import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {useParams} from "react-router-dom"
import ReportDetails from "./ReportDetails"
import {getAllCases} from "../../Redux/casesSlice"
import {getLoadingStatus} from "../../Redux/selectors"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"


const ReportDetailsContainer: React.FC = () => {

    const dispatch = useAppDispatch()
    const idFromUrl = useParams()["*"]
    const isLoading = useAppSelector(getLoadingStatus)

    useEffect(() => {
        idFromUrl && dispatch(getAllCases(idFromUrl))
    }, [dispatch, idFromUrl])

    return (
        <div>
            {
                isLoading && <Loader/>
            }
            <h2>Детали отчета</h2>
            <ReportDetails/>
        </div>
    )
}

export default ReportDetailsContainer