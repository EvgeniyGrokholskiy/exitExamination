import React from "react"
import styles from "./officersItem.module.scss"
import MyButton from "../../../MyButton/MyButton";
import ListItem from "../../../ListComponents/ListItem"
import {IOfficerItemProps} from "../../../../types/types"
import {getIsOfficerEdit} from "../../../../Redux/selectors"
import {deleteOfficer} from "../../../../Redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../../../Redux/hooks"


const OfficerItem: React.FC<IOfficerItemProps> = ({officer, loggedInUserId, isOnlyCard, isLoggedInUserApproved}) => {

    const dispatch = useAppDispatch()
    const isOfficerEdit = useAppSelector(getIsOfficerEdit)
    const {_id, email, firstName, lastName, approved} = officer

    const conditionalRender = !isOfficerEdit && _id !== loggedInUserId && isLoggedInUserApproved


    return (
        <div className={styles.wrapper + ` ${isOnlyCard && styles.withOutHover}`} title={"Нажмите для просмотра"}
             key={_id}
             onClick={() => !isOnlyCard && window.location.assign(`employees-list/${_id}`)}>
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
            {
                conditionalRender &&
                <MyButton callback={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation()
                    dispatch(deleteOfficer(_id))
                }}>Удалить
                </MyButton>
            }
        </div>
    )
}

export default OfficerItem