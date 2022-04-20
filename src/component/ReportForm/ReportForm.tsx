import React, {FormEvent, useState} from "react"
import styles from "./reportForm.module.scss"
import FormInput from "../FormComponet/FormInput/FormInput";
import FormTextarea from "../FormComponet/FormTextarea/FormTextarea";
import {IReportItem} from "../ReportsList/ReportsList";

interface IPublicReportFormProps {
    isLogin: boolean | undefined
    addNewReport: (report: IReportItem) => void

}

const ReportForm: React.FC<IPublicReportFormProps> = ({isLogin, addNewReport}) => {

    const [formState, setFormState] = useState({
        licenseNumber: "",
        ownerFullName: "",
        type: "",
        clientId: "",
        color: "",
        date: "",
        officer: "",
        description: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState((prevState => {
            return {
                ...prevState, [event.target.name]: event.target.value
            }
        }))
    }

    return (
        <>
            <h1>Сообщение о краже</h1>
            <p>Пожалуйста заполните форму для отправки сообщения о краже. <br/> P.S. Поля помеченные "*", являются
                обязательными к заполнению.</p>
            <form className={styles.formWrapper} onSubmit={((event: FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                addNewReport(formState)
                setFormState({
                    licenseNumber: "",
                    ownerFullName: "",
                    type: "",
                    clientId: "",
                    color: "",
                    date: "",
                    officer: "",
                    description: ""
                })
            })}>
                <FormInput label={"Номер лицензии*:"} type={"text"} name={"licenseNumber"} required={true}
                           value={formState.licenseNumber}
                           callback={handleChange}/>
                <FormInput label={"ФИО арендатора*:"} type={"text"} name={"ownerFullName"} required={true}
                           value={formState.ownerFullName}
                           callback={handleChange}/>
                <FormInput label={"Тип велосипеда*:"} type={"text"} name={"type"} required={true} value={formState.type}
                           callback={handleChange}/>
                {
                    isLogin
                        ? <FormInput label={"Идентификационный номер сотрудника:"} type={"text"} name={"officer"}
                                     required={false}
                                     value={formState.officer}
                                     callback={handleChange}/>

                        : <FormInput label={"Идентификационный номер арендатора*:"} type={"text"} name={"clientId"}
                                     required={true}
                                     value={formState.clientId}
                                     callback={handleChange}/>
                }

                <FormInput label={"Цвет:"} type={"text"} name={"color"} required={false} value={formState.color}
                           callback={handleChange}/>
                <FormInput label={"Дата происшествия:"} type={"date"} name={"date"} required={false}
                           value={formState.date}
                           callback={handleChange}/>
                <FormTextarea label={"Описание происшествия:"} name={"description"} required={false}
                              value={formState.description}
                              callback={handleChange}/>
                <button>Отправить сообщение</button>

            </form>
        </>
    )
}

export default ReportForm;