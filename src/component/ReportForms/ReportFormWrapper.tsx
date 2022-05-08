import React, {useEffect} from "react"
import {changeCaseValue} from "../../Redux/casesSlice"
import {getAllOfficersArray} from "../../Redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import ReportFormPublic from "./ReportFormPublic/ReportFormPublic"
import {getAuthIsLogin, getIsCreated} from "../../Redux/selectors"
import SendMessageModal from "../FormComponet/SendMessageModal/SendMessageModal"
import ReportFormForLoggedInOfficer from "./ReportFormForLoggedInOfficer/ReportFormForLoggedInOfficer"


const ReportFormWrapper = () => {

    const dispatch = useAppDispatch()
    const isCreated = useAppSelector(getIsCreated)
    const isLogin = useAppSelector(getAuthIsLogin)

    useEffect(()=>{
        dispatch(getAllOfficersArray())
    },[dispatch])

    return (
        <>
            {
                isCreated && <SendMessageModal action={changeCaseValue}/>
            }
            <h1>Сообщение о краже</h1>
            <p>Пожалуйста заполните форму для отправки сообщения о краже. <br/> P.S. Поля помеченные "*", являются
                обязательными к заполнению.</p>
            {
                isLogin ? <ReportFormForLoggedInOfficer/> : <ReportFormPublic/>
            }

        </>
    )
}

export default ReportFormWrapper