import "./index.css"
import App from "./App"
import React from "react"
import {Provider} from "react-redux"
import ReactDOM from "react-dom/client"
import store from "./Redux/store"
import {BrowserRouter} from "react-router-dom"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)
root.render(
    <Provider store={store}>
        <BrowserRouter basename={"/exitExamination"}>
            <App/>
        </BrowserRouter>
    </Provider>
)
