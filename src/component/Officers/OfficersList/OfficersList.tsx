import React, {useEffect} from "react"
import Loader from "../../Loader/Loader"
import styles from "./officersList.module.scss"
import OfficerItem from "./OfficerItem/OfficerItem"
import {getAllOfficersArray} from "../../Redux/oficersSllice"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks"

const OfficersList = () => {

    const isLoading = useAppSelector(state => state.officers.isLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllOfficersArray())
    }, [dispatch])

    const officersArray = useAppSelector(state => state.officers.officersArray)

    return (
        <>
            {
                isLoading && <Loader/>
            }
            <div className={styles.wrapper}>
                {
                    officersArray.map((officer) => <OfficerItem officer={officer}/>)
                }
            </div>
        </>
    );
};

export default OfficersList;