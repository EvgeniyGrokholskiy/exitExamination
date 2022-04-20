import React from "react"
import styles from "./reportList.module.scss"
import ReportListItem from "./ReportListItem/ReportListItem"

export interface IReportItem {
    licenseNumber: string
    ownerFullName: string
    type: string
    clientId: string
    color: string
    date: string
    officer: string
    description: string
}

interface IReportsListProps {
    state: Array<IReportItem>
    handleDelete: (licenseNumber: string) => void
}

const ReportsList: React.FC<IReportsListProps> = ({state, handleDelete}) => {


    return (
        <>
            <h1>Список сообщений о кражах велосипедов</h1>
            <div className={styles.wrapper}>
                {
                    state.map((item) => {
                        return <ReportListItem key={item.clientId} licenseNumber={item.licenseNumber}
                                               ownerFullName={item.ownerFullName}
                                               type={item.type} clientId={item.clientId} color={item.color}
                                               date={item.date} officer={item.officer}
                                               description={item.description}
                                               handleDelete={handleDelete}
                                               handleLinkToDetails={() => {
                                                   window.location.assign(`/reports-list/${item.clientId}`)
                                               }}
                        />
                    })
                }
            </div>
        </>
    )
}

export default ReportsList