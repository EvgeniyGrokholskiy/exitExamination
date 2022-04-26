import React from "react"
import {useParams} from "react-router-dom"
import {IReportItem} from "../ReportsList/ReportsList";
import ReportDetails from "./ReportDetails";

interface IReportDetailsProps {
    state: Array<IReportItem>
}

const ReportDetailsContainer: React.FC<IReportDetailsProps> = ({state}) => {

    const idFromUrl = useParams()["*"]

    const report = state.filter((item) => item.licenseNumber === idFromUrl)

    return (
        <div>
            report details
            <ReportDetails report={report[0]}/>
        </div>
    )
}

export default ReportDetailsContainer