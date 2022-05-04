import React from "react"
import styles from "./sendMessage.module.scss"
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../../Redux/hooks";

interface ISendMessageModalProps {
    action: ActionCreatorWithPayload<{ fieldName: string, value: string | boolean | null }>
}

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