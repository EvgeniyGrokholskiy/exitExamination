import React from "react"
import MyButton from "../../MyButton/MyButton"
import styles from "./officersItem.module.scss"
import {useAppDispatch} from "../../../Redux/hooks"
import ListItem from "../../ListComponents/ListItem"
import {IOfficerItemProps} from "../../../types/types"
import {deleteOfficer} from "../../../Redux/officersSllice"


const OfficerItem: React.FC<IOfficerItemProps> = ({officer, loggedInUserId, isLoggedInUserApproved, isNoHover}) => {

    const dispatch = useAppDispatch()
    const {_id, email, firstName, lastName, approved} = officer

    const conditionalRender = _id !== loggedInUserId && isLoggedInUserApproved


    return (
        <div className={`${styles.wrapper} ${isNoHover && styles.withOutHover}`} title={"Нажмите для просмотра подробностей"}>
            {
                isNoHover && <ListItem label={"ID:"} value={officer._id} />
            }
            {
                isNoHover && <ListItem label={"ClientID:"} value={officer.clientId} />
            }
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
            <div className={styles.buttonsWrapper}>
                {
                    conditionalRender && !isNoHover &&
                    <MyButton callback={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault()
                        dispatch(deleteOfficer(_id))
                    }}>Удалить
                    </MyButton>
                }
                {
                    <div className={styles.spacer}>

                    </div>
                }
            </div>
        </div>
    )
}

export default OfficerItem