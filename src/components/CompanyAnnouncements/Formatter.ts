export default function Formatter(createdHour: any, createdMinutes: any) {
    if (createdHour === "00") {
        return createdHour = (createdHour = 12 + createdMinutes + "AM")
    }
    if (createdHour === "12") {
        return createdHour = (createdHour = 12 + createdMinutes + "PM")
    }
    if (createdHour >= 12) {
        return createdHour = (createdHour - 12 + createdMinutes + "PM")
    }
    else {
        return createdHour = (createdHour + createdMinutes + "AM")
    }
}