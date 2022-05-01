import "./App.css"
import React, {useEffect} from "react"
import Main from "./component/Main/Main"
import Login from "./component/Login/Login"
import Header from "./component/Header/Header"
import {Route, Routes} from "react-router-dom"
import ReportForm from "./component/ReportForm/ReportForm"
import ReportsList from "./component/ReportsList/ReportsList"
import {useAppDispatch, useAppSelector} from "./component/redux/hooks"
import OfficersList from "./component/Officers/OfficersList/OfficersList"
import EmployeesDetails from "./component/EmployeesDetails/EmployeesDetails"
import ReportDetailsContainer from "./component/ReportDetails/ReportDetailsContainer"
import {changeAuthValue, setIsLogin, setNewUser, tokenVerification} from "./component/redux/authSlice"

function App() {

    const {isLogin, bearer} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(setIsLogin(false))
        dispatch(setNewUser(false))
    }

    useEffect(() => {
        const value = localStorage.getItem("isLogin")
        const bearer = localStorage.getItem("bearer")
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
        localStorage.setItem("isLogin", String(isLogin))
    }, [isLogin])

    useEffect(()=>{
        localStorage.setItem("bearer", String(bearer))
    },[bearer])

    useEffect(() => {
        dispatch(tokenVerification())
    }, [dispatch])

    return (
        <div className="App">
            <header>
                <Header isLogin={isLogin} logout={logout}/>
            </header>
            <main>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/login"} element={<Login isLogin={isLogin}/>}/>
                    <Route path={"/report"} element={<ReportForm/>}/>
                    <Route path={"/reports-list"} element={<ReportsList/>}/>
                    <Route path={"/reports-list/*"} element={<ReportDetailsContainer/>}/>
                    <Route path={"/employees-list"} element={<OfficersList/>}/>
                    <Route path={"/employees/*"} element={<EmployeesDetails/>}/>
                </Routes>
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;
