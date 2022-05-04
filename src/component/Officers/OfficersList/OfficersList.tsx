import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import styles from "./officersList.module.scss"
import OfficerItem from "./OfficerItem/OfficerItem"
import {getAllOfficersArray} from "../../../Redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getAllOfficers, getOfficerIsLoading} from "../../../Redux/selectors"


const OfficersList = () => {

    const dispatch = useAppDispatch()
    const officersArray = useAppSelector(getAllOfficers)
    const isLoading = useAppSelector(getOfficerIsLoading)

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
                    officersArray.map((officer) => <OfficerItem key={officer._id} officer={officer}/>)
                }
            </div>
        </>
    )
}

export default OfficersList