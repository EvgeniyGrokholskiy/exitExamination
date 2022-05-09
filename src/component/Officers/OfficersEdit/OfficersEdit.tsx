import React from "react"
import MyButton from "../../MyButton/MyButton"
import {getOfficer} from "../../../Redux/selectors"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {changeOneOfficerValue, updateOfficer} from "../../../Redux/officersSllice"


const OfficersEdit: React.FC = () => {

    const dispatch = useAppDispatch()
    const {_id, firstName, lastName, approved} = useAppSelector(getOfficer)

    return (
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
        }}>
            <MyButton callback={() => dispatch(updateOfficer(_id))}>Сохранить</MyButton>
            <FormInput label={"Имя"} type={"text"} name={"firstName"} required={false} value={firstName}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Фамилия"} type={"text"} name={"lastName"} required={false} value={lastName}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Доверенный сотрудник"} type={"checkbox"} name={"approved"} required={false}
                       checked={approved} action={changeOneOfficerValue}/>
        </form>
    )
}

export default OfficersEdit