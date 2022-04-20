import React from "react"
import styles from "./reportListItem.module.scss"

interface IReportListItemProps {
    licenseNumber: string,
    ownerFullName: string,
    type: string,
    clientId: string,
    color: string,
    date: string,
    officer: string,
    description: string
    handleDelete: (licenseNumber: string) => void
    handleLinkToDetails: (e:any) => void
}

const ReportListItem: React.FC<IReportListItemProps> = ({
                                                            licenseNumber,
                                                            ownerFullName,
                                                            type,
                                                            clientId,
                                                            color,
                                                            date,
                                                            description,
                                                            handleDelete,
                                                            handleLinkToDetails
                                                        }) => {
    return (
        <div className={styles.wrapper} onClick={(e:any)=>{handleLinkToDetails(e)}}>
            <div className={styles.items}>{date}</div>
            <div className={styles.items}>{clientId}</div>
            <div className={styles.items}>{ownerFullName}</div>
            <div className={styles.items}>{licenseNumber}</div>
            <div className={styles.items}>{type}</div>
            <div className={styles.items}>{color}</div>
            <div className={styles.items}>{description}</div>
            <div className={`${styles.items} ${styles.closeIcon}`} onClick={() => {
                handleDelete(licenseNumber)
            }}>X
            </div>
        </div>
    )
}

export default ReportListItem