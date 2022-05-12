import React from "react"
import MyLink from "../MyLink/MyLink"
import styles from "./page404.module.scss"
import Image404 from "../../assets/img/Page404.png"

const page404: React.FC = () => {

    return (
        <div className={styles.wrapper}>
            <img className={styles.image} src={Image404} alt={"Сломанный велосипед"}
                 title={"УПС! Нет такой страницы!"}/>
            <div className={styles.back_button_container}>
                <MyLink link={"/"}>Назад на главную страницу!</MyLink>
            </div>
        </div>
    )
}

export default page404