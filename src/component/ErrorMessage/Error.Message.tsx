import React from "react"
import MyButton from "../MyButton/MyButton"
import styles from "./errorMessage.module.scss"
import {useAppSelector} from "../../Redux/hooks"
import {getCaseFetchError, getOfficerFetchError} from "../../Redux/selectors"


const ErrorMessage: React.FC = () => {

    const casesFetchError = useAppSelector(getCaseFetchError)
    const officerFetchError = useAppSelector(getOfficerFetchError)

    const conditionalRender = casesFetchError || officerFetchError

    const handlePageReload = () => window.location.reload()

    if (conditionalRender) {
        return (
            <div className={styles.wrapper}>
                <h2 className={styles.text}>
                    {casesFetchError && `CasesApiError: ${casesFetchError}`}<br/><br/>{officerFetchError && `OfficersApiError: ${officerFetchError}`}
                </h2>
                <MyButton callback={handlePageReload}>Попробовать еще раз!</MyButton>
            </div>
        )
    } else {
        return (
            <></>
        )
    }

}

export default ErrorMessage