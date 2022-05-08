import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import styles from "./officersList.module.scss"
import OfficerItem from "./OfficerItem/OfficerItem"
import {getAllOfficersArray} from "../../../Redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {
    getAllOfficers,
    getIsLoggedInUserApproved,
    getLoggedInUserId,
    getOfficerIsLoading
} from "../../../Redux/selectors"


const OfficersList = () => {

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
            <div className={styles.wrapper}>
                {
                    isLoggedInUserApproved && officersArray.map((officer) => <OfficerItem key={officer._id}
                                                                                          officer={officer}
                                                                                          loggedInUserId={loggedInUserId}
                                                                                          isOnlyCard={false}
                                                                                          isLoggedInUserApproved={isLoggedInUserApproved}/>)
                }
                {
                    !isLoggedInUserApproved && officersArray.map((officer) => <OfficerItem key={officer._id}
                                                                                           isOnlyCard={true}
                                                                                           officer={officer}
                                                                                           loggedInUserId={loggedInUserId}
                                                                                           isLoggedInUserApproved={isLoggedInUserApproved}/>)
                }
            </div>
        </>
    )
}

export default OfficersList