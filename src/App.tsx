import "./App.css"
import Main from "./component/Main/Main"
import Login from "./component/Login/Login"
import Header from "./component/Header/Header"
import {Route, Routes} from "react-router-dom"
import React, {useEffect, useState} from "react"
import ReportForm from "./component/ReportForm/ReportForm"
import ReportsList, {IReportItem} from "./component/ReportsList/ReportsList"
import EmployeesList from "./component/EmployeesList/EmployeesList"
import EmployeesDetails from "./component/EmployeesDetails/EmployeesDetails"
import ReportDetailsContainer from "./component/ReportDetails/ReportDetailsContainer"

function App() {

    const [isLogin, setIsLogin] = useState<boolean>()

    const login = (valueObj: { email: string, password: string }) => {
        setIsLogin(true)
        console.log(valueObj)
    }

    const logout = () => {
        setIsLogin(false)
    }

    const [state, setState] = useState([
        {
            licenseNumber: "1",
            ownerFullName: "Иванов Иван Иванович",
            type: "двухколесный",
            clientId: "1",
            color: "красный",
            date: "2.2.02",
            officer: "Пинкертон Алан",
            description: "Само проебалось"
        },
        {
            licenseNumber: "2",
            ownerFullName: "Петров Петр Петрович",
            type: "трехколесный",
            clientId: "2",
            color: "черный",
            date: "3.3.03",
            officer: "Коломбо Фрэнк",
            description: "набежали дети, дали в морду, увели велик"
        },
        {
            licenseNumber: "3",
            ownerFullName: "Сидоров Сидор Сидорович",
            type: "квадроцикл",
            clientId: "3",
            color: "розовый",
            date: "4.04.04",
            officer: "Марпл Джейн",
            description: "Байкеры отжали на покататься, обещали вернуть((("
        }]
    )

    const handleDelete = (licenseNumber: string) => {
        const newArray = state.filter((item) => {
            return item.licenseNumber !== licenseNumber
        })
        setState(newArray)
    }

    const addNewReport = (report: IReportItem) => {
        const newArray = state.concat(report)
        setState(newArray)
    }

    useEffect(() => {
        const value = localStorage.getItem("isLogin")
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
                    <Route path={"/report"} element={<ReportForm isLogin={isLogin} addNewReport={addNewReport}/>}/>
                    <Route path={"/reports-list"} element={<ReportsList state={state} handleDelete={handleDelete}/>}/>
                    <Route path={"/reports-list/*"} element={<ReportDetailsContainer state={state}/>}/>
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
