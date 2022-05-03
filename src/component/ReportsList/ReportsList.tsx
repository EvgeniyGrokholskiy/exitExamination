import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import styles from "./reportList.module.scss"
import {getOfficerName} from "../Helpers/Helpers"
import {getAllOfficersArray} from "../Redux/oficersSllice"
import ReportListItem from "./ReportListItem/ReportListItem"
import {useAppDispatch, useAppSelector} from "../Redux/hooks"
import {getCasesArray, getLoadingStatus} from "../Redux/selectors"
import {deleteCase, getAllCases, ICaseState} from "../Redux/casesSlice"

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
    const officersArray = useAppSelector(state => state.officers.officersArray)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllCases(""))
        dispatch(getAllOfficersArray())
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
                                               type={item.type} createdAt={item.createdAt} updatedAt={item.updatedAt}
                                               color={item.color}
                                               date={item.date} officer={getOfficerName(officersArray, item.officer)}
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