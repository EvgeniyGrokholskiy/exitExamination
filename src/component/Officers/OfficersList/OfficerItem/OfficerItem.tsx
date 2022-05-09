import React from "react"
import MyLink from "../../../MyLink/MyLink"
import styles from "./officersItem.module.scss"
import MyButton from "../../../MyButton/MyButton"
import {useAppDispatch} from "../../../../Redux/hooks"
import ListItem from "../../../ListComponents/ListItem"
import {IOfficerItemProps} from "../../../../types/types"
import {setOfficerEditMode} from "../../../../Redux/appSlice"
import {deleteOfficer} from "../../../../Redux/officersSllice"


const OfficerItem: React.FC<IOfficerItemProps> = ({officer, loggedInUserId, isLoggedInUserApproved}) => {

    const dispatch = useAppDispatch()
    const {_id, email, firstName, lastName, approved} = officer

    const conditionalRender = _id !== loggedInUserId && isLoggedInUserApproved


    return (
        <div className={styles.wrapper} title={"Нажмите для просмотра"}>
            <ListItem label={"Имя:"} value={firstName}/>
            <ListItem label={"Фамилия:"} value={lastName}/>
            <ListItem label={"Электронная почта:"} value={email}/>
            <ListItem label={"Доверенный сотрудник"} value={approved}/>
            <div className={styles.buttonsWrapper}>
                {
                    conditionalRender &&
                    <MyButton callback={(event: React.MouseEvent<HTMLButtonElement>) => {
                        event.stopPropagation()
                        dispatch(deleteOfficer(_id))
                    }}>Удалить
                    </MyButton>
                }
                {
                    isLoggedInUserApproved && <MyLink link={`/employees-list/${_id}`} callback={() => {
                        dispatch(setOfficerEditMode(true))
                    }}>Редактировать</MyLink>
                }
            </div>
        </div>
    )
}

export default OfficerItem