import React from "react"
import MyLink from "../../../MyLink/MyLink"
import styles from "./officersItem.module.scss"
import MyButton from "../../../MyButton/MyButton"
import ListItem from "../../../ListComponents/ListItem"
import {IOfficerItemProps} from "../../../../types/types"
import {getIsOfficerEdit} from "../../../../Redux/selectors"
import {deleteOfficer} from "../../../../Redux/officersSllice"
import {setOfficerEditMode} from "../../../../Redux/appSlice"
import {useAppDispatch, useAppSelector} from "../../../../Redux/hooks"


const OfficerItem: React.FC<IOfficerItemProps> = ({officer, loggedInUserId, isLoggedInUserApproved}) => {

    const dispatch = useAppDispatch()
    const isOfficerEdit = useAppSelector(getIsOfficerEdit)
    const {_id, email, firstName, lastName, approved} = officer

    const conditionalRender = !isOfficerEdit && _id !== loggedInUserId && isLoggedInUserApproved


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