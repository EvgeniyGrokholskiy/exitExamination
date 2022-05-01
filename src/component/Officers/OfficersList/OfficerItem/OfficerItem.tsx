import React from "react"
import styles from "./officersItem.module.scss"
import ListItem from "../../../ListComponents/ListItem"
import {IOfficerState} from "../../../redux/oficersSllice"

interface IOfficerItemProps {
    officer: IOfficerState
}

const OfficerItem: React.FC<IOfficerItemProps> = ({officer}) => {

    const {_id, email, firstName, lastName, approved} = officer

    return (
        <div className={styles.wrapper} key={_id}>
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
        </div>
    )
}

export default OfficerItem