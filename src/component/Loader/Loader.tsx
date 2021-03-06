import React from "react"
import styles from "./loader.module.scss"
import loader from "../../assets/img/loader.gif"

const Loader:React.FC = () => {
    return (
        <img className={styles.image} src={loader} alt={"Индикатор загрузки"}/>
    )
}

export default Loader