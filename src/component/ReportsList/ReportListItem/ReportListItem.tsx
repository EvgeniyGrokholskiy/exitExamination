import React from "react"
import styles from "./reportListItem.module.scss"

interface IReportListItemProps {
    status: string
    licenseNumber: string
    ownerFullName: string
    type: string
    createdAt: string | null
    updatedAt: string | null
    color: string
    date: string
    officer: string
    description: string
    resolution: string
    handleLinkToDetails: () => void
    handleDeleteCase: (event: React.MouseEvent<HTMLTableDataCellElement>) => void
}

const ReportListItem: React.FC<IReportListItemProps> = ({
                                                            status,
                                                            licenseNumber,
                                                            ownerFullName,
                                                            type,
                                                            createdAt,
                                                            updatedAt,
                                                            color,
                                                            date,
                                                            officer,
                                                            description,
                                                            resolution,
                                                            handleLinkToDetails,
                                                            handleDeleteCase
                                                        }) => {
    return (

        <tr onClick={handleLinkToDetails}>
            <td className={styles.items}>{`${createdAt?.slice(0, 10)} ${createdAt?.slice(11,19)}`}</td>
            <td className={styles.items}>{status}</td>
            <td className={styles.items}>{licenseNumber}</td>
            <td className={styles.items}>{type}</td>
            <td className={styles.items}>{ownerFullName}</td>
            <td className={styles.items}>{`${updatedAt?.slice(0, 10)} ${updatedAt?.slice(11,19)}`}</td>
            <td className={styles.items}>{color}</td>
            <td className={`${styles.items} ${styles.extra_width}`}>{date?.slice(0, 10)}</td>
            <td className={styles.items}>{officer}</td>
            <td className={styles.items}>{description}</td>
            <td className={styles.items}>{resolution}</td>
            <td className={`${styles.items} ${styles.delete_button}`} onClick={handleDeleteCase}>X</td>
        </tr>
    )
}

export default ReportListItem