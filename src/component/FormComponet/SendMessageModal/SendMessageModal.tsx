import React from "react"
import styles from "./sendMessage.module.scss"
import {useAppDispatch} from "../../../Redux/hooks"
import {ISendMessageModalProps} from "../../../types/types";


const SendMessageModal: React.FC<ISendMessageModalProps> = ({action}) => {

    const dispatch = useAppDispatch()

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.sendReport}>Сообщение успешно отправлено</h1>
            <button className={styles.close_button} onClick={() => {
                dispatch(action({fieldName: "isCreated", value: false}))
            }}>Закрыть
            </button>
        </div>
    );
};

export default SendMessageModal;