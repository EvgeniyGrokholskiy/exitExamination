import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import {NavLink} from "react-router-dom"
import styles from "./officersList.module.scss"
import OfficerItem from "../OfficerItem/OfficerItem"
import {getAllOfficersArray} from "../../../Redux/officersSllice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {
    getAllOfficers,
    getIsLoggedInUserApproved,
    getLoggedInUserId,
    getOfficerIsLoading
} from "../../../Redux/selectors"


const OfficersList: React.FC = () => {

    const dispatch = useAppDispatch()
    const officersArray = useAppSelector(getAllOfficers)
    const isLoading = useAppSelector(getOfficerIsLoading)
    const loggedInUserId = useAppSelector(getLoggedInUserId)
    const isLoggedInUserApproved = useAppSelector(getIsLoggedInUserApproved)

    useEffect(() => {
        dispatch(getAllOfficersArray())
    }, [dispatch])

    return (
        <>
            {
                isLoading && <Loader/>
            }
            <h1>Список сотрудников</h1>
            {
                !isLoading &&

                <div className={styles.wrapper}>
                    {
                        officersArray.map((officer) => {
                                return (
                                    <NavLink key={officer._id} className={styles.link_to_detail}
                                             to={`/employees-list/${officer._id}`}>
                                        <OfficerItem
                                            isOnlyCard={false}
                                            officer={officer}
                                            loggedInUserId={loggedInUserId}
                                            isLoggedInUserApproved={isLoggedInUserApproved}/>
                                    </NavLink>
                                )
                            }
                        )
                    }
                </div>
            }
        </>
    )
}

export default OfficersList