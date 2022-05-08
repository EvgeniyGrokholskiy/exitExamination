import React, {FormEvent} from "react"
import {NavLink} from "react-router-dom"
import MyButton from "../../MyButton/MyButton"
import {getCase} from "../../../Redux/selectors"
import FormInput from "../../FormComponet/FormInput/FormInput"
import FormSelect from "../../FormComponet/FormSelect/FormSelect"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import styles from "../ReportFormPublic/reportFormPublic.module.scss"
import FormTextarea from "../../FormComponet/FormTextarea/FormTextarea"
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
        resolution
    } = useAppSelector(getCase)

    const dispatch = useAppDispatch()
    const {error} = useAppSelector(getCase)

    return (
        <>
            <form className={`${styles.formWrapper} ${styles.extra_width}`}
                  onSubmit={((event: FormEvent<HTMLFormElement>) => {
                      event.preventDefault()
                      dispatch(createAuthorisedCase())
                      dispatch(clearCaseForm())
                  })}>
                <FormInput label={"Номер лицензии*:"} type={"text"} name={"licenseNumber"} required={true}
                           value={licenseNumber}
                           action={changeCaseValue}/>
                <FormSelect label={"Тип велосипеда*:"} name={"type"} required={true} value={type}
                            action={changeCaseValue}/>
                <FormInput label={"ФИО арендатора*:"} type={"text"} name={"ownerFullName"} required={true}
                           value={ownerFullName}
                           action={changeCaseValue}/>
                <FormInput label={"Цвет велосипеда:"} type={"text"} name={"color"} required={false} value={color}
                           action={changeCaseValue}/>
                <FormInput label={"Дата кражи:"} type={"date"} name={"date"} required={false}
                           value={`${date?.slice(0, 10)}`}
                           action={changeCaseValue}/>
                <FormOfficersList label={"Ответственный сотрудник:"} name={"officer"} value={officer} required={false}
                                  action={changeCaseValue}/>
                <FormTextarea label={"Дополнительный комментарий:"} name={"description"} required={false}
                              value={description}
                              action={changeCaseValue}/>
                <FormTextarea label={"Завершающий комментарий:"} name={"resolution"} required={false}
                              value={resolution}
                              action={changeCaseValue}/>
                <MyButton>Отправить</MyButton>
                {
                    error && <h2 className={styles.error}>{error}</h2>
                }
            </form>
            <NavLink className={styles.cancel_button} to={"/reports-list"}>Отмена</NavLink>
        </>
    )
}

export default ReportFormForLoggedInOfficer