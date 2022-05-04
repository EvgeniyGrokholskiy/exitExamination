import React from "react"
import styles from "./reportCard.module.scss"
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
            <p><span
                className={styles.label}>{`Дата создания сообщения:`}</span>{` ${createdAt?.slice(0, 10)} ${createdAt?.slice(11, 19)}`}
            </p>
            <p><span className={styles.label}>{`Статус сообщения:`}</span>{` ${getStatusTranslate(status)}`}</p>
            <p><span className={styles.label}>{`Номер лицензии:`}</span>{` ${licenseNumber}`}</p>
            <p><span className={styles.label}>{`Тип велосипеда:`}</span>{` ${type}`}</p>
            <p><span className={styles.label}>{`ФИО пользователя (арендатора велосипеда):`}</span>{` ${ownerFullName}`}
            </p>
            <p><span
                className={styles.label}>{`Дата последнего обновления сообщения:`}</span>{` ${updatedAt?.slice(0, 10)} ${updatedAt?.slice(11, 19)}`}
            </p>
            <p><span className={styles.label}>{`Цвет велосипеда:`}</span>{` ${color}`}</p>
            <p><span className={styles.label}>{`Дата кражи:`}</span>{` ${date?.slice(0, 10)}`}</p>
            <p><span className={styles.label}>{`Ответственный сотрудник:`}</span>{` ${officer}`}</p>
            <p><span className={styles.label}>{`Дополнительный комментарий:`}</span>{` ${description}`}</p>
            <p><span
                className={styles.label}>{`Завершающий комментарий:`}</span>{` ${resolution ? resolution : "отсутствует"}`}
            </p>
            <button className={styles.delete_button} onClick={handleDeleteCase}>Удалить</button>
        </div>
    );
};

export default ReportsCard;