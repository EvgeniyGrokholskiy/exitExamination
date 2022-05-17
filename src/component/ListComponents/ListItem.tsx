import React from "react"
import styles from "./listItem.module.scss"
import {IListItemProps} from "../../types/types"


const ListItem: React.FC<IListItemProps> = ({label, value}) => {

    const renderText = (value: boolean | string | null) => {
        if (typeof value === "boolean") {
            return value ? "Да" : "Нет"
        } else {
            return value
        }
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>{label}</p>
            <p className={styles.text}>{renderText(value)}</p>
        </div>
    )

};

export default ListItem;