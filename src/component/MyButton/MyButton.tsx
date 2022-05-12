import React from "react"
import styles from "./myButton.module.scss"
import { IMyButtonProps } from "../../types/types"


const MyButton: React.FC<IMyButtonProps> = ({callback, children}) => {

    return (
        <button className={styles.button}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => callback && callback(event)}>
            {children}
        </button>
    )
}

export default MyButton