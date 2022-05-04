const minuteLength = 60;
const hourLength = 60 * 60;
const dayLength = 60 * 60 * 24;

/**
 * Calculates the tie between two dates and returns a well formatted string.
 * @param {Date} date1 
 * @param {Date} date2 
 * @returns - like "42 seconds ago"
 */
export function timeBetween(date1: Date, date2: Date): string {
    const timeBetweenInSec = Math
        .floor(Math.abs(date1.getTime() - date2.getTime()) / 1000);
    let time, unit;
    if (timeBetweenInSec >= dayLength) {
        time = Math.floor(timeBetweenInSec / dayLength);
        unit = "day";
    } else if (timeBetweenInSec >= hourLength) {
        time = Math.floor(timeBetweenInSec / hourLength);
        unit = "hour";
    } else if (timeBetweenInSec >= minuteLength) {
        time = Math.floor(timeBetweenInSec / minuteLength);
        unit = "minute";
    } else {
        time = timeBetweenInSec;
        unit = "second";
    }
    if (time === 1) {
        return `${time} ${unit} ago`;
    } else {
        return `${time} ${unit}s ago`;
    }
}