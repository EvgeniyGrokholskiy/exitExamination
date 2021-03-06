import Loader from "../Loader/Loader"
import React, {useEffect} from "react"
import {NavLink} from "react-router-dom"
import {ICaseState} from "../../types/types"
import styles from "./reportCardList.module.scss"
import ReportsCard from "./ReportListItem/ReportsCard"
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
    }, [dispatch])

    return (
        <>
            <h1>Список сообщений о кражах велосипедов</h1>
            <div className={styles.wrapper}>
                {
                    isLoading && <Loader/>
                }
                {
                    casesArray.map((caseItem: ICaseState) => {
                        return (
                            <NavLink key={caseItem._id} className={styles.link_to_card} to={`/reports-list/${caseItem._id}`}>
                                <ReportsCard
                                    oneCase={caseItem}
                                    isLoggedUserApproved={isLoggedUserApproved}
                                    handleDeleteCase={(event: React.MouseEvent<HTMLButtonElement>) => {
                                        event.preventDefault()
                                        dispatch(deleteCase(caseItem._id))
                                    }}
                                />
                            </NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ReportCardList