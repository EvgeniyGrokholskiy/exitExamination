import "./App.css"
import React, {useEffect} from "react"
import Main from "./component/Main/Main"
import {localStorageApi} from "./api/api"
import Login from "./component/Login/Login"
import Page404 from "./component/404/Page404"
import Header from "./component/Header/Header"
import {Route, Routes} from "react-router-dom"
import {getAuthIsLogin, getBearer} from "./Redux/selectors"
import {useAppDispatch, useAppSelector} from "./Redux/hooks"
import ReportCardList from "./component/ReportsList/ReportCardList"
import OfficersList from "./component/Officers/OfficersList/OfficersList"
import ReportFormWrapper from "./component/ReportForms/ReportFormWrapper";
import OfficerDetails from "./component/Officers/OfficerDetail/OfficerDetails"
import {changeAuthValue, setIsLogin, tokenVerification} from "./Redux/authSlice"
import ReportDetailsContainer from "./component/ReportDetails/ReportDetailContainer/ReportDetailsContainer"
import CreateNewOfficer from "./component/Officers/CreateNewOfficer/CreateNewOfficer";
import ErrorMessage from "./component/ErrorMessage/Error.Message";


function App() {

    const dispatch = useAppDispatch()
    const bearer = useAppSelector(getBearer)
    const isLogin = useAppSelector(getAuthIsLogin)

    useEffect(() => {
        const value = localStorageApi.getIsLogin()
        const bearer = localStorageApi.getBearer()
        bearer && dispatch(changeAuthValue({fieldName: "bearer", value: bearer}))
        if (value && value === "true") {
            dispatch(setIsLogin(true))
        } else if (value && value === "false") {
            dispatch(setIsLogin(false))
        } else {
            return
        }
    }, [dispatch])

    useEffect(() => {
        localStorageApi.setIsLogin(isLogin)
    }, [isLogin])

    useEffect(()=>{
        localStorageApi.setBearer(bearer)
    },[bearer])

    useEffect(() => {
        dispatch(tokenVerification())
    }, [dispatch])

    return (
        <div className="App">
            <ErrorMessage/>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/report"} element={<ReportFormWrapper/>}/>
                    <Route path={"/reports-list"} element={<ReportCardList/>}/>
                    <Route path={"/reports-list/*"} element={<ReportDetailsContainer/>}/>
                    <Route path={"/employees-list"} element={<OfficersList/>}/>
                    <Route path={"/employees-list/*"} element={<OfficerDetails/>}/>
                    <Route path={"/employees-new/"} element={<CreateNewOfficer/>}/>
                    <Route path={"*"} element={<Page404/>}/>
                </Routes>
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default App
