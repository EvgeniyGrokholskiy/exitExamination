import React from "react"
import MyLink from "../MyLink/MyLink"
import styles from "./page404.module.scss"
import Image404 from "../../assets/img/Page404.png"

const page404 = () => {

    return (
        <div className={styles.wrapper}>
            <img className={styles.image} src={Image404} alt={"Сломанный велосипед"}
                 title={"УПС! Нет такой страницы!"}/>
            <MyLink link={"/"}>{"Назад на главную страницу!"}</MyLink>
        </div>
    )
}

export default page404