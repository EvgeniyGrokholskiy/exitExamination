import React from "react"
import styles from "./footer.module.scss"

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <p>Сделано: Кем-то.</p>
            <p>Когда-то.</p>
            <p>Для кого-то.</p>
        </div>
    );
};

export default Footer;