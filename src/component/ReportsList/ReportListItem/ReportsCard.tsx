import React from "react"
import styles from "./reportCard.module.scss"
import MyButton from "../../MyButton/MyButton";
import {IReportsCardProps} from "../../../types/types"
import {getStatusTranslate} from "../../Helpers/Helpers"


const ReportsCard: React.FC<IReportsCardProps> = ({
                                                      status,
                                                      licenseNumber,
                                                      ownerFullName,
                                                      type,
                                                      createdAt,
                                                      updatedAt,
                                                      color,
                                                      date,
                                                      officer,
                                                      description,
                                                      resolution,
                                                      handleLinkToDetails,
                                                      handleDeleteCase
                                                  }) => {
    return (

        <div className={styles.wrapper} onClick={handleLinkToDetails}>
            <p className={styles.text_block}><span
                className={styles.label}>{`Дата создания сообщения:`}</span>{` ${createdAt?.slice(0, 10)} ${createdAt?.slice(11, 19)}`}
            </p>
            <p className={styles.text_block}><span className={styles.label}>{`Статус сообщения:`}</span>{` ${getStatusTranslate(status)}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`Номер лицензии:`}</span>{` ${licenseNumber}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`Тип велосипеда:`}</span>{` ${type}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`ФИО пользователя (арендатора велосипеда):`}</span>{` ${ownerFullName}`}
            </p>
            <p className={styles.text_block}><span
                className={styles.label}>{`Дата последнего обновления сообщения:`}</span>{` ${updatedAt?.slice(0, 10)} ${updatedAt?.slice(11, 19)}`}
            </p>
            <p className={styles.text_block}><span className={styles.label}>{`Цвет велосипеда:`}</span>{` ${color}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`Дата кражи:`}</span>{` ${date?.slice(0, 10)}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`Ответственный сотрудник:`}</span>{` ${officer}`}</p>
            <p className={styles.text_block}><span className={styles.label}>{`Дополнительный комментарий:`}</span>{` ${description}`}</p>
            <p className={styles.text_block}><span
                className={styles.label}>{`Завершающий комментарий:`}</span>{` ${resolution ? resolution : "отсутствует"}`}
            </p>
            <MyButton callback={handleDeleteCase}>Удалить</MyButton>
        </div>
    );
};

export default ReportsCard;