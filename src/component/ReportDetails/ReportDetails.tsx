import React, {useState} from "react"
import styles from "./reportDetails.module.scss"
import {IReportItem} from "../ReportsList/ReportsList"

interface IReportDetailsProps {
    report: IReportItem
}

const ReportDetails: React.FC<IReportDetailsProps> = ({report}) => {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className={styles.wrapper}>
            <p className={styles.item}>{report.date}</p>
            <p className={styles.item}>{report.licenseNumber}</p>
            <p className={styles.item}>{report.ownerFullName}</p>
            <p className={styles.item}>{report.color}</p>
            <p className={styles.item}>{report.officer}</p>
            <p className={styles.item}>{report.description}</p>
            <p className={styles.item}>solution</p>
            <p className={styles.item}>status</p>
        </div>
    )
}

export default ReportDetails