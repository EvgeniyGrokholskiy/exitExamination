import React from "react"
import styles from "./loader.module.scss"
import loader from "../../assets/img/loader.gif"

const Loader = () => {
    return (
        <img className={styles.image} src={loader}/>
    )
}

export default Loader