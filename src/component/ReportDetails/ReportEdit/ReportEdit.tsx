import React, {FormEvent} from "react"
import {useAppSelector} from "../../redux/hooks"
import styles from "../../ReportForm/reportForm.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput"
import FormSelect from "../../FormComponet/FormSelect/FormSelect"
import FormTextarea from "../../FormComponet/FormTextarea/FormTextarea"
import {changeEditCaseValue, getCase, ICaseState} from "../../redux/casesSlice"
import FormOfficersList from "../../FormComponet/FormOfficersList/FormOfficersList"
import FormStatesSelect from "../../FormComponet/FormStatusSelect/FormStatesSelect"

interface IReportEditProps {
    report: ICaseState
}

const ReportEdit: React.FC<IReportEditProps> = ({report}) => {

    const {
        createdAt,
        status,
        licenseNumber,
        type,
        ownerFullName,
        color,
        date,
        officer,
        description,
        resolution
    } = report
    const {error} = useAppSelector(getCase)

    return (
        <form className={`${styles.formWrapper} ${styles.extra_width}`}
              onSubmit={((event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault()
              })}>
            <FormInput label={"Дата создания сообщения:"} type={"text"} name={"createdAt"} required={true}
                       value={createdAt?.slice(0, 10)}
                       action={changeEditCaseValue}/>
            <FormStatesSelect label={"Статус сообщения:"} name={"status"} value={status} action={changeEditCaseValue}/>
            <FormInput label={"Номер лицензии:"} type={"text"} name={"licenseNumber"} required={true}
                       value={licenseNumber}
                       action={changeEditCaseValue}/>
            <FormSelect label={"Тип велосипеда:"} name={"type"} value={type} action={changeEditCaseValue}/>
            <FormInput label={"ФИО арендатора:"} type={"text"} name={"ownerFullName"} required={true}
                       value={ownerFullName}
                       action={changeEditCaseValue}/>
            <FormInput label={"Цвет велосипеда:"} type={"text"} name={"color"} required={false} value={color}
                       action={changeEditCaseValue}/>
            <FormInput label={"Дата кражи:"} type={"date"} name={"date"} required={false}
                       value={date?.slice(0, 10)}
                       action={changeEditCaseValue}/>
            <FormOfficersList label={"Ответственный сотрудник:"} name={"officer"} value={officer}
                              action={changeEditCaseValue}/>
            <FormTextarea label={"Дополнительный комментарий:"} name={"description"} required={false}
                          value={description}
                          action={changeEditCaseValue}/>
            <FormTextarea label={"Завершающий комментарий:"} name={"resolution"} required={false}
                          value={resolution}
                          action={changeEditCaseValue}/>
            {
                error && <h2 className={styles.error}>{error}</h2>
            }

        </form>
    );
};

export default ReportEdit;