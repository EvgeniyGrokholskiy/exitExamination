import React, {FormEvent} from "react"
import MyButton from "../../MyButton/MyButton"
import {getCase} from "../../../Redux/selectors"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import styles from "../ReportFormPublic/reportFormPublic.module.scss"
import FormTextarea from "../../FormComponet/FormTextarea/FormTextarea"
import FormTypeSelect from "../../FormComponet/FormTypeSelect/FormTypeSelect"
import FormOfficersList from "../../FormComponet/FormOfficersList/FormOfficersList"
import {changeCaseValue, clearCaseForm, createAuthorisedCase} from "../../../Redux/casesSlice"


const ReportFormForLoggedInOfficer = () => {

    const {
        licenseNumber,
        type,
        ownerFullName,
        color,
        date,
        officer,
        description,
    } = useAppSelector(getCase)

    const dispatch = useAppDispatch()
    const {error} = useAppSelector(getCase)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(createAuthorisedCase())
        dispatch(clearCaseForm())
    }

    return (
        <form className={`${styles.formWrapper} ${styles.extra_width}`}
              onSubmit={handleSubmit}>
            <FormInput label={"Номер лицензии*:"} type={"text"} name={"licenseNumber"} required={true}
                       value={licenseNumber}
                       action={changeCaseValue}/>
            <FormInput label={"ФИО арендатора*:"} type={"text"} name={"ownerFullName"} required={true}
                       value={ownerFullName}
                       action={changeCaseValue}/>
            <FormTypeSelect label={"Тип велосипеда*:"} name={"type"} required={true} value={type}
                            action={changeCaseValue}/>
            <FormInput label={"Цвет велосипеда:"} type={"text"} name={"color"} required={false} value={color}
                       action={changeCaseValue}/>
            <FormInput label={"Дата кражи:"} type={"date"} name={"date"} required={false}
                       value={`${date?.slice(0, 10)}`}
                       action={changeCaseValue}/>
            <FormOfficersList label={"Ответственный сотрудник:"} name={"officer"} value={officer} required={false}
                              action={changeCaseValue}/>
            <FormTextarea label={"Дополнительная информация:"} name={"description"} required={false}
                          value={description}
                          action={changeCaseValue}/>
            <MyButton>Отправить</MyButton>
            {
                error && <h2 className={styles.error}>{error}</h2>
            }
        </form>
    )
}

export default ReportFormForLoggedInOfficer