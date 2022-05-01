import React from "react"
import styles from "./listItem.module.scss"

interface IListItemProps {
    label: string
    value: string | boolean | null
}

const ListItem: React.FC<IListItemProps> = ({label, value}) => {

    const conditionalRender = (value: boolean | string | null) => {
        if (typeof value === "boolean") {
            return value ? "Да" : "Нет"
        } else {
            return value
        }
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>{label}</p>
            <p className={styles.text}>{conditionalRender(value)}</p>
        </div>
    )

};

export default ListItem;