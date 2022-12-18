function toTwoDigits(number: number): string {
    return `${number <= 9 ? "0" : ""}${number}`;
}

// yyyy-MM-dd HH:mm
export function getDateTimeStr(date: Date): string {
    return (
        `${date.getFullYear()}-` +
        `${toTwoDigits(date.getMonth() + 1)}-` +
        `${toTwoDigits(date.getDate())} ` +
        `${toTwoDigits(date.getHours())}:` +
        `${toTwoDigits(date.getMinutes())}`
    );
}
