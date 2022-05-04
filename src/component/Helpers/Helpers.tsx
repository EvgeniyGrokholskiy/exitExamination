import {IOfficerState} from "../../types/types";

export const getOfficerName = (officesArray: Array<IOfficerState>, id: string) => {
    if (officesArray?.length !== 0) {
        const officer = officesArray.filter((item: IOfficerState) => item._id === id)
        if (officer[0]) {
            const {firstName, lastName} = officer[0]
            return `${firstName} ${lastName}`
        }
        return "Сотрудник не назначен"
    }
    return "Сотрудник не назначен"
}

export const getStatusTranslate = (status:string) => {
    switch (status) {
        case "new":
            return "Новое"
        case "in_progress":
            return "В процессе"
        case "done":
            return "Завершено"
    }
}