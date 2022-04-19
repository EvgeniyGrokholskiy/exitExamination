import "./App.css"
import React, {useEffect, useState} from "react"
import Main from "./component/Main/Main"
import Login from "./component/Login/Login"
import Header from "./component/Header/Header"
import {Route, Routes} from "react-router-dom"
import ReportForm from "./component/ReportForm/ReportForm";
import ReportsList from "./component/ReportsList/ReportsList";
import ReportsDetails from "./component/ReportsDetails/ReportsDetails";
import EmployeesList from "./component/EmployeesList/EmployeesList";
import EmployeesDetails from "./component/EmployeesDetails/EmployeesDetails";

function App() {

    const [isLogin, setIsLogin] = useState<boolean>()

    const login = (valueObj: { email: string, password: string }) => {
        setIsLogin(true)
        console.log(valueObj)
    }

    const logout = () => {
        setIsLogin(false)
    }

    useEffect(() => {
        const value = localStorage.getItem("isLogin")
        debugger
        if (value && value === "true") {
            setIsLogin(true)
        } else if (value && value === "false") {
            setIsLogin(false)
        } else {
            return
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("isLogin", String(isLogin))
    }, [isLogin])



    return (
        <div className="App">
            <header>
                <Header isLogin={isLogin} logout={logout}/>
            </header>
            <main>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/login"} element={<Login login={login} isLogin={isLogin}/>}/>
                    <Route path={"/report"} element={<ReportForm/>}/>
                    <Route path={"/reports-list"} element={<ReportsList/>}/>
                    <Route path={"/report/*"} element={<ReportsDetails/>}/>
                    <Route path={"/employees-list"} element={<EmployeesList/>}/>
                    <Route path={"/employees/*"} element={<EmployeesDetails/>}/>
                </Routes>
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;