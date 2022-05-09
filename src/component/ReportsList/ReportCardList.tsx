import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {NavLink} from "react-router-dom"
import {ICaseState} from "../../types/types"
import styles from "./reportCardList.module.scss"
import ReportsCard from "./ReportListItem/ReportsCard"
import {getAllOfficersArray} from "../../Redux/officersSllice"
import {deleteCase, getAllCases} from "../../Redux/casesSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getCasesArray, getIsLoggedInUserApproved, getLoadingStatus} from "../../Redux/selectors"


const ReportCardList = () => {

    const dispatch = useAppDispatch()
    const casesArray = useAppSelector(getCasesArray)
    const isLoading = useAppSelector(getLoadingStatus)
    const isLoggedUserApproved = useAppSelector(getIsLoggedInUserApproved)

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
                        return <NavLink className={styles.link_to_card} to={`/reports-list/${item._id}`}><ReportsCard key={item._id} oneCase={item}
                                                                                      isLoggedUserApproved={isLoggedUserApproved}
                                                                                      handleLinkToDetails={() => {
                                                                                          //window.location.assign(`/exitExamination/reports-list/${item._id}`)
                                                                                      }}
                                                                                      handleDeleteCase={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                                                          event.stopPropagation()
                                                                                          dispatch(deleteCase(item._id))
                                                                                      }}
                        /></NavLink>
                    })
                }
            </div>
        </>
    )
}

export default ReportCardList