import "./App.css"
import Main from "./component/Main/Main"
import Login from "./component/Login/Login"
import Header from "./component/Header/Header"
import {Route, Routes} from "react-router-dom"
import React, {useEffect, useState} from "react"
import {setIsLogin, setNewUser} from "./component/redux/authSlice"
import ReportForm from "./component/ReportForm/ReportForm"
import EmployeesList from "./component/EmployeesList/EmployeesList"
import {useAppDispatch, useAppSelector} from "./component/redux/hooks"
import ReportsList, {IReportItem} from "./component/ReportsList/ReportsList"
import EmployeesDetails from "./component/EmployeesDetails/EmployeesDetails"
import ReportDetailsContainer from "./component/ReportDetails/ReportDetailsContainer"

function App() {

    const {isLogin} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(setIsLogin(false))
        dispatch(setNewUser(false))
    }

    const [state2, setState2] = useState([
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
        const newArray = state2.filter((item) => {
            return item.licenseNumber !== licenseNumber
        })
        setState2(newArray)
    }

    const addNewReport = (report: IReportItem) => {
        const newArray = state2.concat(report)
        setState2(newArray)
    }

    useEffect(() => {
        const value = localStorage.getItem("isLogin")
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


    return (
        <div className="App">
            <header>
                <Header isLogin={isLogin} logout={logout}/>
            </header>
            <main>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/login"} element={<Login isLogin={isLogin}/>}/>
                    <Route path={"/report"} element={<ReportForm isLogin={isLogin} addNewReport={addNewReport}/>}/>
                    <Route path={"/reports-list"} element={<ReportsList state={state2} handleDelete={handleDelete}/>}/>
                    <Route path={"/reports-list/*"} element={<ReportDetailsContainer state={state2}/>}/>
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
