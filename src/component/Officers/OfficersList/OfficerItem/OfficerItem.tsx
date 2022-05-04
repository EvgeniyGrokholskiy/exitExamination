import React from "react"
import styles from "./officersItem.module.scss"
import {IOfficerInProps} from "../../../../types/types"
import ListItem from "../../../ListComponents/ListItem"
import {getIsOfficerEdit} from "../../../../Redux/selectors"
import {deleteOfficer} from "../../../../Redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../../../Redux/hooks"


const OfficerItem: React.FC<IOfficerInProps> = ({officer}) => {

    const dispatch = useAppDispatch()
    const isOfficerEdit = useAppSelector(getIsOfficerEdit)
    const {_id, email, firstName, lastName, approved} = officer

    return (
        <div className={styles.wrapper} title={"Нажмите для просмотра"} key={_id}
             onClick={() => window.location.assign(`employees-list/${_id}`)}>
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
            {
                !isOfficerEdit &&
                <button title={"Удалить сотрудника"} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation()
                    dispatch(deleteOfficer(_id))
                }}>Удалить
                </button>
            }
        </div>
    )
}

export default OfficerItem