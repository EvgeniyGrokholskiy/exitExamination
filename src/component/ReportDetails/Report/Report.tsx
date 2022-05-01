import React from "react"
import styles from "./report.module.scss"
import {ICaseState} from "../../redux/casesSlice"

interface IReportProps {
    report: ICaseState
}

const Report: React.FC<IReportProps> = ({report}) => {

    if (report) {
        return (
            <table className={styles.table}>
                <tbody>
                <tr>
                    <td className={styles.table_item}>Дата создания сообщения</td>
                    <td className={styles.table_item}>{report.createdAt?.slice(0, 10)}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Статус сообщения</td>
                    <td className={styles.table_item}>{report.status}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Номер лицензии</td>
                    <td className={styles.table_item}>{report.licenseNumber}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Тип велосипеда</td>
                    <td className={styles.table_item}>{report.type}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>ФИО пользователя (арендатора велосипеда)</td>
                    <td className={styles.table_item}>{report.ownerFullName}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Дата последнего обновления сообщения</td>
                    <td className={styles.table_item}>{report.updateAt?.slice(0, 10)}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Цвет велосипеда</td>
                    <td className={styles.table_item}>{report.color}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Дата кражи</td>
                    <td className={styles.table_item}>{report.date}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Ответственный сотрудник</td>
                    <td className={styles.table_item}>{report.officer}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Дополнительный комментарий</td>
                    <td className={styles.table_item}>{report.description}</td>
                </tr>
                <tr>
                    <td className={styles.table_item}>Завершающий комментарий</td>
                    <td className={styles.table_item}>{report.resolution}</td>
                </tr>
                </tbody>
            </table>
        )
    } else {
        return (
            <h1>loading</h1>
        )
    }

};

export default Report;