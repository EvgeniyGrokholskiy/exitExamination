import React from "react"
import {NavLink} from "react-router-dom"
import styles from "./myLink.module.scss"
import {IMyNavLinkProps} from "../../types/types"


const MyLink: React.FC<IMyNavLinkProps> = ({link, children, callback}) => {

    return (
        <NavLink className={styles.link} to={link} onClick={(event:React.MouseEvent<HTMLAnchorElement>)=>{callback && callback(event)}}>
            {children}
        </NavLink>
    )
}

export default MyLink