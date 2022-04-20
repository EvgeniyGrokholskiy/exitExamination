import React from "react"
import {useParams} from "react-router-dom"
import {IReportItem} from "../ReportsList/ReportsList";
import ReportDetails from "./ReportDetails";

interface IReportDetailsProps {
    state: Array<IReportItem>
}

const ReportDetailsContainer: React.FC<IReportDetailsProps> = ({state}) => {

    const params = useParams()["*"]

    const report = state.filter((item) => item.licenseNumber === params)

    return (
        <div>
            report details
            <ReportDetails report={report[0]}/>
        </div>
    )
}

export default ReportDetailsContainer