import React from "react"
import MyButton from "../../MyButton/MyButton"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {getIsOfficerEdit, getOfficer} from "../../../Redux/selectors"
import {changeOneOfficerValue, updateOfficer} from "../../../Redux/officersSllice"


const OfficersEdit: React.FC = () => {

    const dispatch = useAppDispatch()
    const isOfficerEdit = useAppSelector(getIsOfficerEdit)
    const {_id, firstName, lastName, approved} = useAppSelector(getOfficer)

    return (
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            dispatch(updateOfficer(_id))
        }}>
            {
                !isOfficerEdit && <h3>Данные сохранены.</h3>
            }
            <FormInput label={"Имя"} type={"text"} name={"firstName"} required={false} value={firstName}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Фамилия"} type={"text"} name={"lastName"} required={false} value={lastName}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Доверенный сотрудник"} type={"checkbox"} name={"approved"} required={false}
                       checked={approved} action={changeOneOfficerValue}/>
            <MyButton>Сохранить</MyButton>
        </form>
    )
}

export default OfficersEdit