import React from 'react';
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import FormInput from "../../FormComponet/FormInput/FormInput"
import {changeOneOfficerValue, updateOfficer} from "../../Redux/oficersSllice"


const OfficersEdit: React.FC = () => {

    const {_id,firstName, lastName, email, approved} = useAppSelector(state => state.officers.oneOfficer)
    const dispatch = useAppDispatch()

    return (
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

        }}>
            <button onClick={()=> dispatch(updateOfficer(_id))}>Сохранить</button>
            <FormInput label={"Имя"} type={"text"} name={"firstName"} required={false} value={firstName}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Фамилия"} type={"text"} name={"lastName"} required={false} value={lastName}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Логин"} type={"email"} name={"email"} required={false} value={email}
                       action={changeOneOfficerValue}/>
            <FormInput label={"Доверенный сотрудник"} type={"checkbox"} name={"approved"} required={false}
                       checked={approved} action={changeOneOfficerValue}/>

        </form>
    );
};

export default OfficersEdit;