import React from "react"
import MyButton from "../../MyButton/MyButton"
import styles from "./createNewOfficer.module.scss"
import {getNewOfficer} from "../../../Redux/selectors"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {changeNewOfficerValue, createOfficer} from "../../../Redux/officersSllice"


const CreateNewOfficer = () => {

    const dispatch = useAppDispatch()
    const {firstName, lastName, password, approved, email} = useAppSelector(getNewOfficer)

    return (
        <div className={styles.wrapper}>
            <h1>{"Создать нового сотрудника"}</h1>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault()
            }}>
                <FormInput label={"Имя"} type={"text"} name={"firstName"} required={false} value={firstName}
                           action={changeNewOfficerValue}/>
                <FormInput label={"Фамилия"} type={"text"} name={"lastName"} required={false} value={lastName}
                           action={changeNewOfficerValue}/>
                <FormInput label={"Email"} type={"email"} name={"email"} required={true} value={email}
                           action={changeNewOfficerValue}/>
                <FormInput label={"Password"} type={"text"} name={"password"} required={true} value={password}
                           action={changeNewOfficerValue}/>
                <FormInput label={"Доверенный сотрудник"} type={"checkbox"} name={"approved"} required={false}
                           checked={approved} action={changeNewOfficerValue}/>
                <MyButton callback={() => dispatch(createOfficer())}>{"Создать"}</MyButton>
            </form>
        </div>
    )
}

export default CreateNewOfficer