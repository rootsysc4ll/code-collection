import dayjs from "dayjs"

export function formatMoney(amountCents: number) {
    return `$${(amountCents / 100).toFixed(2)}`
}

export function formatDate(timeMS: number) {
    return dayjs(timeMS).format('dddd, MMMM D')
}