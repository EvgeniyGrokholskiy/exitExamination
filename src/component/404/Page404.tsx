import React from "react"
import {NavLink} from "react-router-dom"
import styles from "./page404.module.scss"
import Image404 from "../../assets/img/Page404.png"

const page404 = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.image} src={Image404} alt={"Велосипед"} title={"УПС! Мы потерялись!"}/>
            <NavLink className={styles.backButton} to={"/"}>{"Назад в безопасность!"}</NavLink>
        </div>
    )
}

export default page404