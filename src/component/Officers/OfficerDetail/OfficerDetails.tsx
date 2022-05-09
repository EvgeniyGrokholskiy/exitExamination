import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import {useParams} from "react-router-dom"
import styles from "./officerDetails.module.scss"
import OfficersEdit from "../OfficersEdit/OfficersEdit"
import {getOneOfficer} from "../../../Redux/officersSllice"
import {getOfficerIsLoading} from "../../../Redux/selectors"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"


const OfficerDetails = () => {

    const dispatch = useAppDispatch()
    const idFromURL = useParams()["*"]
    const isLoading = useAppSelector(getOfficerIsLoading)

    useEffect(() => {
        idFromURL && dispatch(getOneOfficer(idFromURL))
    }, [idFromURL, dispatch])

    return (
        <div className={styles.wrapper}>
            {
                isLoading && <Loader/>
            }
            {
                !isLoading &&

                <div className={styles.buttonBlock}>
                    <OfficersEdit/>
                </div>
            }
        </div>
    )
}

export default OfficerDetails