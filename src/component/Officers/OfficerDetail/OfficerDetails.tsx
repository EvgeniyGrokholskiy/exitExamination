import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import {NavLink, useParams} from "react-router-dom"
import styles from "./officerDetails.module.scss"
import OfficersEdit from "../OfficersEdit/OfficersEdit"
import {getOneOfficer} from "../../Redux/oficersSllice"
import {setOfficerEditMode} from "../../Redux/appSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import OfficerItem from "../OfficersList/OfficerItem/OfficerItem"

const OfficerDetails = () => {

    const dispatch = useAppDispatch()
    const idFromURL = useParams()["*"]
    const isLoading = useAppSelector(state => state.officers.isLoading)
    const officer = useAppSelector(state => state.officers.oneOfficer)
    const isOfficerEdit = useAppSelector(state => state.app.isOfficerEdit)

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

export default OfficerDetails;