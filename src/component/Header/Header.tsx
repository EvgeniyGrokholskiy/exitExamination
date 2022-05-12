import React from "react"
import MyLink from "../MyLink/MyLink"
import {NavLink} from "react-router-dom"
import styles from "./header.module.scss"
import {logOut, setNewUser} from "../../Redux/authSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"
import {getAuthIsLogin, getLoggedUserEmail} from "../../Redux/selectors"


const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(getAuthIsLogin)
    const loggedUserEmail = useAppSelector(getLoggedUserEmail)

    const handleLogOut = () => {
        dispatch(logOut())
        dispatch(setNewUser(false))
    }

    return (
        <div className={styles.wrapper}>
            <ul className={styles.menu}>
                <li className={styles.menu_item}>
                    <NavLink to={"/"}
                             className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>Главная</NavLink>
                </li>
                <li className={styles.menu_item}>
                    <NavLink to={"/report"}
                             className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>Сообщить
                        о краже</NavLink>
                </li>
                {
                    isLogin && <li className={styles.menu_item}>
                        <NavLink to={"/reports-list"}
                                 className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>
                            Сообщения о кражах
                        </NavLink>
                    </li>
                }
                {
                    isLogin && <li className={styles.menu_item}>
                        <NavLink to={"/employees-list"}
                                 className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>
                            Список сотрудников
                        </NavLink>
                    </li>
                }
                {
                    isLogin && <li className={styles.menu_item}>
                        <NavLink to={"/employees-new"}
                                 className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>
                            Создать сотрудника
                        </NavLink>
                    </li>
                }

            </ul>
            <div className={styles.auth_block}>
                {
                    !isLogin && <li className={styles.menu_item}>
                        <NavLink
                            className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}
                            to={"login"}>
                            LogIn
                        </NavLink>
                    </li>
                }
                {
                    isLogin && <span className={styles.email}>{loggedUserEmail}</span>
                }
                {
                    isLogin && (
                        <li className={styles.menu_item}>
                            <MyLink link={"/"} callback={handleLogOut}>LogOut</MyLink>
                        </li>
                    )
                }
            </div>
        </div>
    )
}

export default Header