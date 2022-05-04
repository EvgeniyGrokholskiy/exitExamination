import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import styles from "./officerDetails.module.scss"
import {NavLink, useParams} from "react-router-dom"
import OfficersEdit from "../OfficersEdit/OfficersEdit"
import {getOneOfficer} from "../../../Redux/oficersSllice"
import {setOfficerEditMode} from "../../../Redux/appSlice"
import OfficerItem from "../OfficersList/OfficerItem/OfficerItem"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getIsOfficerEdit, getOfficer, getOfficerIsLoading} from "../../../Redux/selectors"

const OfficerDetails = () => {

    const dispatch = useAppDispatch()
    const idFromURL = useParams()["*"]
    const officer = useAppSelector(getOfficer)
    const isLoading = useAppSelector(getOfficerIsLoading)
    const isOfficerEdit = useAppSelector(getIsOfficerEdit)

    useEffect(() => {
        idFromURL && dispatch(getOneOfficer(idFromURL))
    }, [idFromURL, dispatch])

    return (
        <div className={styles.wrapper}>
            {
                isLoading && <Loader/>
            }
            {
                !isOfficerEdit && <button onClick={() => dispatch(setOfficerEditMode(true))}>Редактировать</button>
            }
            <NavLink className={styles.back_button} to={"/employees-list"}>Назад</NavLink>
            {
                !isOfficerEdit && officer && <OfficerItem officer={officer}/>
            }
            {
                isOfficerEdit && <OfficersEdit/>
            }
        </div>
    )
}

export default OfficerDetails