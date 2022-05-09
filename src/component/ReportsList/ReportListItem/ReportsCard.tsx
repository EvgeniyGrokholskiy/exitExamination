import React from "react"
import styles from "./reportCard.module.scss"
import MyButton from "../../MyButton/MyButton";
import {IReportsCardProps} from "../../../types/types"
import {getStatusTranslate} from "../../Helpers/Helpers"


const ReportsCard: React.FC<IReportsCardProps> = ({
                                                      oneCase,
                                                      isLoggedUserApproved,
                                                      handleDeleteCase
                                                  }) => {

    const {
        status,
        licenseNumber,
        ownerFullName,
        type,
        date,
    } = oneCase

    return (
        <div className={styles.wrapper}>
            <p className={styles.text_block}><span
                className={styles.label}>{`Статус сообщения:`}</span>{` ${getStatusTranslate(status)}`}</p>
            <p className={styles.text_block}><span
                className={styles.label}>{`Номер лицензии:`}</span>{` ${licenseNumber}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`Тип велосипеда:`}</span>{` ${type}`}</p>
            <p className={styles.text_block}><span
                className={styles.label}>{`ФИО пользователя (арендатора велосипеда):`}</span>{` ${ownerFullName}`}
            </p>
            <p className={styles.text_block}><span
                className={styles.label}>{`Дата кражи:`}</span>{` ${date?.slice(0, 10)}`}</p>
            {
                isLoggedUserApproved && <MyButton callback={handleDeleteCase}>Удалить</MyButton>
            }
        </div>
    );
};

export default ReportsCard;