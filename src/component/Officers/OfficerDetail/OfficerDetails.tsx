import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import MyLink from "../../MyLink/MyLink"
import {useParams} from "react-router-dom"
import MyButton from "../../MyButton/MyButton"
import styles from "./officerDetails.module.scss"
import OfficerItem from "../OfficerItem/OfficerItem"
import OfficersEdit from "../OfficersEdit/OfficersEdit"
import {setOfficerEditMode} from "../../../Redux/appSlice"
import {getOneOfficer} from "../../../Redux/officersSllice"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {
    getIsLoggedInUserApproved,
    getIsOfficerEdit,
    getLoggedInUserId,
    getOfficer,
    getOfficerIsLoading
} from "../../../Redux/selectors"


const OfficerDetails:React.FC = () => {

    const dispatch = useAppDispatch()
    const idFromURL = useParams()["*"]
    const officer = useAppSelector(getOfficer)
    const isEditMode = useAppSelector(getIsOfficerEdit)
    const isLoading = useAppSelector(getOfficerIsLoading)
    const loggedInUserId = useAppSelector(getLoggedInUserId)
    const isLoggedInUserApproved = useAppSelector(getIsLoggedInUserApproved)

    useEffect(() => {
        idFromURL && dispatch(getOneOfficer(idFromURL))
    }, [idFromURL, dispatch])

    const handleBack = () => {
        dispatch(setOfficerEditMode(false))
    }

    const handleCancel = () => {
        idFromURL && dispatch(getOneOfficer(idFromURL))
        dispatch(setOfficerEditMode(false))
    }

    return (
        <div className={styles.outer_wrapper}>
            {
                isEditMode ? <h1>Редактировать данные сотрудника</h1> : <h1>Детальная информация о сотруднике</h1>
            }
            <div className={styles.wrapper}>
                {
                    isLoading && <Loader/>
                }
                {
                    isEditMode
                        ? <OfficersEdit/>
                        : <OfficerItem isOnlyCard={true} officer={officer} loggedInUserId={loggedInUserId}
                                       isLoggedInUserApproved={isLoggedInUserApproved}/>
                }
                {
                    !isEditMode &&

                    <div className={styles.buttonBlock}>
                        {
                            isLoggedInUserApproved && <MyButton callback={() => {
                                dispatch(setOfficerEditMode(true))
                            }}>Редактировать</MyButton>
                        }
                        <MyLink link={"/employees-list"}
                                callback={handleBack}>Назад</MyLink>
                    </div>
                }
            </div>
            {
                isEditMode && <MyButton callback={handleCancel}>Отмена</MyButton>
            }
        </div>
    )
}

export default OfficerDetails