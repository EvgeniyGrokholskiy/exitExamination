import React from "react"
import styles from "./main.module.scss"
import {NavLink} from "react-router-dom"
import photo from "./../../assets/img/bike_theft.jpg"

const Main = () => {
    return (
        <div>
            <h1 className={styles.header}>Сервис для сообщения о кражах велосипедах сданных в прокат.</h1>
            <p className={styles.text}>Вы пролюбили наш велик, сообщите об обстоятельствах, для этого перейдите по ссылке и заполните
                анкету: <NavLink
                    className={styles.navButton} to={"/report"}>Сообщить о краже</NavLink></p>
            <img className={styles.image} src={photo} alt={"Вор крадет велик"}/>
        </div>
    )
}

export default Main