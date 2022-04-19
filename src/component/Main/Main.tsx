import React from "react"
import styles from "./main.module.scss"
import {NavLink} from "react-router-dom"

const Main = () => {
    return (
        <div>
            main
            <NavLink className={styles.navButton} to={"/report"}>Сообщить о краже</NavLink>
        </div>
    )
}

export default Main