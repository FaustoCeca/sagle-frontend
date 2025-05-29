import dayjs from "dayjs"

export const dateFormatter = (date: string | Date): string => {
    const fixedDate = dayjs(date).add(1, "day");
    
    return dayjs(fixedDate).format("DD-MM-YYYY");
}