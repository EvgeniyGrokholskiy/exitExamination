import React from "react"
import MyButton from "../../MyButton/MyButton"
import styles from "./createNewOfficer.module.scss"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getCreateNewOfficerError, getNewOfficer} from "../../../Redux/selectors"
import {changeNewOfficerValue, createOfficer} from "../../../Redux/officersSllice"


const CreateNewOfficer = () => {

    const dispatch = useAppDispatch()
    const createNewOfficerError = useAppSelector(getCreateNewOfficerError)
    const {firstName, lastName, password, approved, email} = useAppSelector(getNewOfficer)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(createOfficer())
    }

    return (
        <>
            <h1>Создать нового сотрудника</h1>
            <p>Поля помеченные "*", являются обязательными к заполнению.</p>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <FormInput label={"Имя:"} type={"text"} name={"firstName"} required={false} value={firstName}
                               action={changeNewOfficerValue}/>
                    <FormInput label={"Фамилия:"} type={"text"} name={"lastName"} required={false} value={lastName}
                               action={changeNewOfficerValue}/>
                    <FormInput label={"Email*:"} type={"email"} name={"email"} required={true} value={email}
                               action={changeNewOfficerValue}/>
                    <FormInput label={"Password*:"} type={"password"} name={"password"} required={true} value={password}
                               action={changeNewOfficerValue}/>
                    <FormInput label={"Доверенный сотрудник:"} type={"checkbox"} name={"approved"} required={false}
                               checked={approved} action={changeNewOfficerValue}/>
                    {
                        createNewOfficerError && <h2 className={styles.error_message}>{createNewOfficerError}</h2>
                    }
                    <MyButton>Создать</MyButton>
                </form>
            </div>
        </>
    )
}

export default CreateNewOfficer