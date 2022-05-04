import React, {FormEvent} from "react"
import styles from "./reportForm.module.scss"
import FormInput from "../FormComponet/FormInput/FormInput"
import {getAuthIsLogin, getCase} from "../../Redux/selectors"
import FormSelect from "../FormComponet/FormSelect/FormSelect"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import FormTextarea from "../FormComponet/FormTextarea/FormTextarea"
import SendMessageModal from "../FormComponet/SendMessageModal/SendMessageModal"
import {changeCaseValue, clearCaseForm, createAuthorisedCase, createPublicCase} from "../../Redux/casesSlice"


const ReportForm: React.FC = () => {

    const {
        error,
        isCreated,
        licenseNumber,
        ownerFullName,
        type,
        color,
        date,
        description
    } = useAppSelector(getCase)
    const isLogin = useAppSelector(getAuthIsLogin)
    const dispatch = useAppDispatch()


    return (
        <>
            {
                isCreated && <SendMessageModal action={changeCaseValue}/>
            }
            <h1>Сообщение о краже</h1>
            <p>Пожалуйста заполните форму для отправки сообщения о краже. <br/> P.S. Поля помеченные "*", являются
                обязательными к заполнению.</p>
            <form className={styles.formWrapper} onSubmit={((event: FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                if (!isLogin) {
                    dispatch(createPublicCase())
                }else {
                    dispatch(createAuthorisedCase())
                }
                dispatch(clearCaseForm())

            })}>
                <FormInput label={"Номер лицензии*:"} type={"text"} name={"licenseNumber"} required={true}
                           value={licenseNumber}
                           action={changeCaseValue}/>
                <FormInput label={"ФИО арендатора*:"} type={"text"} name={"ownerFullName"} required={true}
                           value={ownerFullName}
                           action={changeCaseValue}/>
                <FormSelect label={"Тип велосипеда*:"} name={"type"} value={type} action={changeCaseValue}/>
                <FormInput label={"Цвет:"} type={"text"} name={"color"} required={false} value={color}
                           action={changeCaseValue}/>
                <FormInput label={"Дата происшествия:"} type={"date"} name={"date"} required={false}
                           value={date}
                           action={changeCaseValue}/>
                <FormTextarea label={"Описание происшествия:"} name={"description"} required={false}
                              value={description}
                              action={changeCaseValue}/>
                <button>Отправить сообщение</button>
                {
                    error && <h2 className={styles.error}>{error}</h2>
                }

            </form>
        </>
    )
}

export default ReportForm