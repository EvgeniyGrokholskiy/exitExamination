import React, {FormEvent} from "react"
import MyButton from "../../MyButton/MyButton"
import {getCase} from "../../../Redux/selectors"
import styles from "./reportFormPublic.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput"
import FormSelect from "../../FormComponet/FormSelect/FormSelect"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import FormTextarea from "../../FormComponet/FormTextarea/FormTextarea"
import {changeCaseValue, clearCaseForm, createPublicCase} from "../../../Redux/casesSlice"


const ReportFormPublic: React.FC = () => {

    const {
        error,
        licenseNumber,
        ownerFullName,
        type,
        color,
        date,
        description
    } = useAppSelector(getCase)
    const dispatch = useAppDispatch()


    return (
        <>
            <form className={styles.formWrapper} onSubmit={((event: FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                dispatch(createPublicCase())
                dispatch(clearCaseForm())

            })}>
                <FormInput label={"Номер лицензии*:"} type={"text"} name={"licenseNumber"} required={true}
                           value={licenseNumber}
                           action={changeCaseValue}/>
                <FormInput label={"ФИО арендатора*:"} type={"text"} name={"ownerFullName"} required={true}
                           value={ownerFullName}
                           action={changeCaseValue}/>
                <FormSelect label={"Тип велосипеда*:"} name={"type"} required={true} value={type}
                            action={changeCaseValue}/>
                <FormInput label={"Цвет:"} type={"text"} name={"color"} required={false} value={color}
                           action={changeCaseValue}/>
                <FormInput label={"Дата происшествия:"} type={"date"} name={"date"} required={false}
                           value={date}
                           action={changeCaseValue}/>
                <FormTextarea label={"Дополнительная информация:"} name={"description"} required={false}
                              value={description}
                              action={changeCaseValue}/>
                <MyButton>Отправить сообщение</MyButton>
                {
                    error && <h2 className={styles.error}>{error}</h2>
                }

            </form>
        </>
    )
}

export default ReportFormPublic