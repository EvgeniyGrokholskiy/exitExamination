import React, {useEffect} from "react"
import styles from "./report.module.scss"
import {IReportInProps} from "../../../types/types"
import {getAllOfficers} from "../../../Redux/selectors"
import {getAllOfficersArray} from "../../../Redux/officersSllice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getOfficerName, getStatusTranslate} from "../../Helpers/Helpers"


const Report: React.FC<IReportInProps> = ({report}) => {

    const dispatch = useAppDispatch()
    const officersArray = useAppSelector(getAllOfficers)
    const {
        createdAt,
        status,
        licenseNumber,
        type,
        ownerFullName,
        updatedAt,
        color,
        date,
        officer,
        description,
        resolution,
        clientId
    } = report

    useEffect(() => {
        dispatch(getAllOfficersArray())
    }, [dispatch])

    if (report) {
        return (
            <>
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <td className={styles.table_item}>Дата создания сообщения</td>
                        <td className={styles.table_item}>{`${createdAt?.slice(0, 10)} ${createdAt?.slice(11, 19)}`}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Статус сообщения</td>
                        <td className={styles.table_item}>{getStatusTranslate(status)}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Номер лицензии</td>
                        <td className={styles.table_item}>{licenseNumber}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Тип велосипеда</td>
                        <td className={styles.table_item}>{type}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>ФИО пользователя (арендатора велосипеда)</td>
                        <td className={styles.table_item}>{ownerFullName}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}> Client Id</td>
                        <td className={styles.table_item}>{clientId}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Дата последнего обновления сообщения</td>
                        <td className={styles.table_item}>{`${updatedAt?.slice(0, 10)} ${updatedAt?.slice(11, 19)}`}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Цвет велосипеда</td>
                        <td className={styles.table_item}>{color}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Дата кражи</td>
                        <td className={styles.table_item}>{`${date?.slice(0, 10)} ${date?.slice(11, 19)}`}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Ответственный сотрудник</td>
                        <td className={styles.table_item}>{getOfficerName(officersArray, officer)}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Дополнительный комментарий</td>
                        <td className={styles.table_item}>{description}</td>
                    </tr>
                    <tr>
                        <td className={styles.table_item}>Завершающий комментарий</td>
                        <td className={styles.table_item}>{resolution}</td>
                    </tr>
                    </tbody>
                </table>
            </>
        )
    } else {
        return (
            <h1>loading</h1>
        )
    }
}

export default Report