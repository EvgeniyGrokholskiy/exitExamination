import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {ICaseState} from "../../types/types"
import {getOfficerName} from "../Helpers/Helpers"
import styles from "./reportCardList.module.scss"
import ReportsCard from "./ReportListItem/ReportsCard"
import {getAllOfficersArray} from "../../Redux/oficersSllice"
import {deleteCase, getAllCases} from "../../Redux/casesSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getAllOfficers, getCasesArray, getLoadingStatus} from "../../Redux/selectors"

const ReportCardList = () => {

    const dispatch = useAppDispatch()
    const casesArray = useAppSelector(getCasesArray)
    const isLoading = useAppSelector(getLoadingStatus)
    const officersArray = useAppSelector(getAllOfficers)

    useEffect(() => {
        dispatch(getAllCases(""))
        dispatch(getAllOfficersArray())
    }, [dispatch])

    return (
        <>
            <h1>Список сообщений о кражах велосипедов</h1>
            <div className={styles.wrapper}>
                {
                    isLoading && <Loader/>
                }
                {
                    casesArray.map((item: ICaseState) => {
                        return <ReportsCard key={item._id}
                                            status={item.status}
                                            licenseNumber={item.licenseNumber}
                                            ownerFullName={item.ownerFullName}
                                            type={item.type} createdAt={item.createdAt}
                                            updatedAt={item.updatedAt} color={item.color} date={item.date}
                                            officer={getOfficerName(officersArray, item.officer)}
                                            description={item.description}
                                            resolution={item.resolution} handleLinkToDetails={() => {
                            window.location.assign(`/reports-list/${item._id}`)
                        }}
                                            handleDeleteCase={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                event.stopPropagation()
                                                dispatch(deleteCase(item._id))
                                            }}
                        />
                    })
                }
            </div>
        </>
    )
}

export default ReportCardList