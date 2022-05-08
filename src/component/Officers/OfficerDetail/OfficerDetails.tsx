import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import MyButton from "../../MyButton/MyButton"
import styles from "./officerDetails.module.scss"
import {NavLink, useParams} from "react-router-dom"
import OfficersEdit from "../OfficersEdit/OfficersEdit"
import {getOneOfficer} from "../../../Redux/oficersSllice"
import {setOfficerEditMode} from "../../../Redux/appSlice"
import OfficerItem from "../OfficersList/OfficerItem/OfficerItem"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {
    getIsLoggedInUserApproved,
    getIsOfficerEdit,
    getLoggedInUserId,
    getOfficer,
    getOfficerIsLoading
} from "../../../Redux/selectors"


const OfficerDetails = () => {

    const dispatch = useAppDispatch()
    const idFromURL = useParams()["*"]
    const officer = useAppSelector(getOfficer)
    const isLoading = useAppSelector(getOfficerIsLoading)
    const isOfficerEdit = useAppSelector(getIsOfficerEdit)
    const loggedInUserId = useAppSelector(getLoggedInUserId)
    const isLoggedInUserApproved = useAppSelector(getIsLoggedInUserApproved)

    useEffect(() => {
        idFromURL && dispatch(getOneOfficer(idFromURL))
    }, [idFromURL, dispatch])

    return (
        <div className={styles.wrapper}>
            {
                isLoading && <Loader/>
            }
            <div className={styles.buttonBlock}>
                {
                    !isOfficerEdit &&
                    <MyButton callback={() => dispatch(setOfficerEditMode(true))}>Редактировать</MyButton>
                }
                <NavLink className={styles.back_button} to={"/employees-list"}>Назад</NavLink>
            </div>
            {
                !isOfficerEdit && officer &&
                <OfficerItem officer={officer} loggedInUserId={loggedInUserId} isOnlyCard={true}
                             isLoggedInUserApproved={isLoggedInUserApproved}/>
            }
            {
                isOfficerEdit && <OfficersEdit/>
            }
        </div>
    )
}

export default OfficerDetails