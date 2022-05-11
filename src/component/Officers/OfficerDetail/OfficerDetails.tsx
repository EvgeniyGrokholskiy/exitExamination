import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import MyLink from "../../MyLink/MyLink"
import {useParams} from "react-router-dom"
import styles from "./officerDetails.module.scss"
import OfficersEdit from "../OfficersEdit/OfficersEdit"
import {
    getIsLoggedInUserApproved,
    getIsOfficerEdit,
    getLoggedInUserId,
    getOfficer,
    getOfficerIsLoading
} from "../../../Redux/selectors"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import OfficerItem from "../OfficerItem/OfficerItem";
import {getOneOfficer} from "../../../Redux/officersSllice";
import {setOfficerEditMode} from "../../../Redux/appSlice";
import MyButton from "../../MyButton/MyButton";


const OfficerDetails = () => {

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
                        : <OfficerItem isNoHover={true} officer={officer} loggedInUserId={loggedInUserId}
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
                                callback={() => dispatch(setOfficerEditMode(false))}>Назад</MyLink>
                    </div>
                }
            </div>
            {
                isEditMode && <MyButton callback={() => dispatch(setOfficerEditMode(false))}>Отмена</MyButton>
            }
        </div>
    )
}

export default OfficerDetails