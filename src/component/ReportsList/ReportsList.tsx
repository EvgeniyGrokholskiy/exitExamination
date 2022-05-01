import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import styles from "./reportList.module.scss"
import ReportListItem from "./ReportListItem/ReportListItem"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import {deleteCase, getAllCases, getCasesArray, getLoadingStatus, ICaseState} from "../redux/casesSlice"

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

}

const ReportsList: React.FC<IReportsListProps> = () => {

    const isLoading = useAppSelector(getLoadingStatus)
    const casesArray = useAppSelector(getCasesArray)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCases())
    }, [dispatch])

    return (
        <>
            {
                isLoading && <Loader/>
            }
            <h1>Список сообщений о кражах велосипедов</h1>
            <table className={styles.table}>
                <thead className={styles.table_header}>
                <tr>
                    <th className={styles.header_item}>Дата создания сообщения</th>
                    <th className={styles.header_item}>Статус сообщения</th>
                    <th className={styles.header_item}>Номер лицензии</th>
                    <th className={styles.header_item}>Тип велосипеда</th>
                    <th className={styles.header_item}>ФИО пользователя (арендатора велосипеда)</th>
                    <th className={styles.header_item}>Дата последнего обновления сообщения</th>
                    <th className={styles.header_item}>Цвет велосипеда</th>
                    <th className={styles.header_item}>Дата кражи</th>
                    <th className={styles.header_item}>Ответственный сотрудник</th>
                    <th className={styles.header_item}>Дополнительный комментарий</th>
                    <th className={styles.header_item}>Завершающий комментарий</th>
                    <th className={styles.header_item}>Удалить</th>
                </tr>
                </thead>
                <tbody>
                {
                    casesArray.map((item: ICaseState) => {
                        return <ReportListItem key={item._id} status={item.status} licenseNumber={item.licenseNumber}
                                               ownerFullName={item.ownerFullName}
                                               type={item.type} createdAt={item.createdAt} updateAt={item.updateAt}
                                               color={item.color}
                                               date={item.date} officer={item.officer}
                                               description={item.description}
                                               resolution={item.resolution}
                                               handleLinkToDetails={() => {
                                                   window.location.assign(`/reports-list/${item._id}`)
                                               }}
                                               handleDeleteCase={(event: React.MouseEvent<HTMLTableDataCellElement>) => {
                                                   event.stopPropagation()
                                                   dispatch(deleteCase(item._id))
                                               }}
                        />
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default ReportsList