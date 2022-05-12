import React from "react"
import MyButton from "../../MyButton/MyButton"
import styles from "./officersItem.module.scss"
import {useAppDispatch} from "../../../Redux/hooks"
import ListItem from "../../ListComponents/ListItem"
import {IOfficerItemProps} from "../../../types/types"
import {deleteOfficer} from "../../../Redux/officersSllice"


const OfficerItem: React.FC<IOfficerItemProps> = ({officer, loggedInUserId, isLoggedInUserApproved, isOnlyCard}) => {

    const dispatch = useAppDispatch()
    const {_id, email, firstName, lastName, approved} = officer

    const conditionalRender = _id !== loggedInUserId && isLoggedInUserApproved

    const handleOfficerDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(deleteOfficer(_id))
    }

    return (
        <div className={`${styles.wrapper} ${isOnlyCard && styles.withOutHover}`}
             title={"Нажмите для просмотра подробностей"}>
            {
                isOnlyCard && <ListItem label={"ID:"} value={officer._id}/>
            }
            {
                isOnlyCard && <ListItem label={"ClientID:"} value={officer.clientId}/>
            }
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
            <div className={styles.buttonsWrapper}>
                {
                    conditionalRender && !isOnlyCard &&
                    <MyButton callback={handleOfficerDelete}>Удалить</MyButton>
                }
                {
                    !isOnlyCard && !conditionalRender && <div className={styles.spacer}/>
                }
            </div>
        </div>
    )
}

export default OfficerItem