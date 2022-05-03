import React from "react"
import styles from "./officersItem.module.scss"
import ListItem from "../../../ListComponents/ListItem"
import {useAppDispatch, useAppSelector} from "../../../Redux/hooks"
import {deleteOfficer, IOfficerState} from "../../../Redux/oficersSllice"

interface IOfficerItemProps {
    officer: IOfficerState
}

const OfficerItem: React.FC<IOfficerItemProps> = ({officer}) => {

    const {_id, email, firstName, lastName, approved} = officer
    const isOfficerEdit = useAppSelector(state => state.app.isOfficerEdit)
    const dispatch = useAppDispatch()

    return (
        <div className={styles.wrapper} title={"Нажмите для просмотра"} key={_id} onClick={() => window.location.assign(`employees-list/${_id}`)}>
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
            {
                !isOfficerEdit && <button title={"Удалить сотрудника"} onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation()
                    dispatch(deleteOfficer(_id))
                }}>Удалить
                </button>
            }
        </div>
    )
}

export default OfficerItem