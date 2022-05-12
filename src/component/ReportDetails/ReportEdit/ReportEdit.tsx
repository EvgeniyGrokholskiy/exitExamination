import React, {FormEvent} from "react"
import MyLink from "../../MyLink/MyLink"
import MyButton from "../../MyButton/MyButton"
import {IReportInProps} from "../../../types/types"
import {useAppDispatch} from "../../../Redux/hooks"
import {setCaseEditMode} from "../../../Redux/appSlice"
import FormInput from "../../FormComponet/FormInput/FormInput"
import FormTextarea from "../../FormComponet/FormTextarea/FormTextarea"
import FormTypeSelect from "../../FormComponet/FormTypeSelect/FormTypeSelect"
import {changeEditCaseValue, saveEditedCase} from "../../../Redux/casesSlice"
import FormOfficersList from "../../FormComponet/FormOfficersList/FormOfficersList"
import FormStatesSelect from "../../FormComponet/FormStatusSelect/FormStatesSelect"
import styles from "../../ReportForms/ReportFormPublic/reportFormPublic.module.scss"


const ReportEdit: React.FC<IReportInProps> = ({report}) => {

    const {
        status,
        licenseNumber,
        type,
        ownerFullName,
        color,
        date,
        officer,
        description,
        resolution,
    } = report

    const dispatch = useAppDispatch()
    const isStatusDone = status === "done"

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(saveEditedCase(report._id))
    }

    const handleSetEditMode = () => dispatch(setCaseEditMode(false))

    return (
        <>
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <FormStatesSelect label={"Статус сообщения:"} name={"status"} value={status}
                                  action={changeEditCaseValue} required={false}/>
                <FormInput label={"Номер лицензии:"} type={"text"} name={"licenseNumber"} required={true}
                           value={licenseNumber}
                           action={changeEditCaseValue}/>
                <FormTypeSelect label={"Тип велосипеда:"} name={"type"} required={true} value={type}
                                action={changeEditCaseValue}/>
                <FormInput label={"ФИО арендатора:"} type={"text"} name={"ownerFullName"} required={true}
                           value={ownerFullName}
                           action={changeEditCaseValue}/>
                <FormInput label={"Цвет велосипеда:"} type={"text"} name={"color"} required={false} value={color}
                           action={changeEditCaseValue}/>
                <FormInput label={"Дата кражи:"} type={"date"} name={"date"} required={false}
                           value={`${date?.slice(0, 10)}`}
                           action={changeEditCaseValue}/>
                <FormOfficersList label={"Ответственный сотрудник:"} name={"officer"} value={officer} required={false}
                                  action={changeEditCaseValue}/>
                <FormTextarea label={"Дополнительный комментарий:"} name={"description"} required={false}
                              value={description}
                              action={changeEditCaseValue}/>
                {
                    isStatusDone &&
                    <FormTextarea label={`${isStatusDone ? "Завершающий комментарий*:" : "Завершающий комментарий:"}`}
                                  name={"resolution"} required={isStatusDone}
                                  value={resolution}
                                  action={changeEditCaseValue}/>
                }
                <MyButton>Сохранить</MyButton>
            </form>
            <MyLink link={"/reports-list"} callback={handleSetEditMode}>Отмена</MyLink>
        </>
    )
}

export default ReportEdit