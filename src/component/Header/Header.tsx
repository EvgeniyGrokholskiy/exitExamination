import React from "react"
import {NavLink} from "react-router-dom"
import styles from "./header.module.scss"
import {getAuthIsLogin} from "../../Redux/selectors"
import {setIsLogin, setNewUser} from "../../Redux/authSlice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"


const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const isLogin = useAppSelector(getAuthIsLogin)

    const logout = () => {
        dispatch(setIsLogin(false))
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
                        о
                        краже</NavLink>
                </li>
                {
                    isLogin && <li className={styles.menu_item}>
                        <NavLink to={"/reports-list"}
                                 className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>Сообщения
                            о
                            кражах</NavLink>
                    </li>
                }
                {
                    isLogin && <li className={styles.menu_item}>
                        <NavLink to={"/employees-list"}
                                 className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}>Список
                            сотрудников</NavLink>
                    </li>
                }
                {
                    !isLogin && <li className={styles.menu_item}>
                        <NavLink
                            className={({isActive}) => isActive ? `${styles.link__active} ${styles.link}` : styles.link}
                            to={"login"}>LogIn</NavLink>
                    </li>
                }
                {
                    isLogin && <li className={styles.menu_item}>
                        <button onClick={logout}>LogOut</button>
                    </li>
                }
            </ul>

        </div>
    )
}

export default Header