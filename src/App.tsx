import "./App.css"
import React, {useState} from "react"
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

    const [isLogin, setIsLogin] = useState(false)

    const login = () => {
        setIsLogin(true)
    }

    const logout = () => {
        setIsLogin(false)
    }

    return (
        <div className="App">
            <Header isLogin={isLogin} logout={logout}/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/login"} element={<Login login={login} isLogin={isLogin}/>}/>
                <Route path={"/report"} element={<ReportForm/>}/>
                <Route path={"/reports-list"} element={<ReportsList/>}/>
                <Route path={"/report/*"} element={<ReportsDetails/>}/>
                <Route path={"/employees-list"} element={<EmployeesList/>}/>
                <Route path={"/employees/*"} element={<EmployeesDetails/>}/>
            </Routes>
        </div>
    );
}

export default App;
