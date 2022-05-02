const dictionary = {
    ago: "ago",
    day: "day",
    days: "days",
    hour: "hour",
    hours: "hours",    
    minute: "minute",
    minutes: "minutes"
};

const minuteLength = 60;
const hourLength = 60 * 60;
const dayLength = 60 * 60 * 24;

export function timeBetween(date1: Date, date2: Date): string {
    const timeBetweenInSec = Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 1000);
    let time;
    if(timeBetweenInSec > dayLength) {
        time = Math.floor(timeBetweenInSec / dayLength);
        if(time === 1) {
            return `${time} ${dictionary.day} ${dictionary.ago}`;
        } else {
            return `${time} ${dictionary.days} ${dictionary.ago}`;
        }
    }
    if(timeBetweenInSec > hourLength) {
        time = Math.floor(timeBetweenInSec / hourLength);
        if(time === 1) {
            return `${time} ${dictionary.hour} ${dictionary.ago}`;
        } else {
            return `${time} ${dictionary.hours} ${dictionary.ago}`;
        }
    }
    if(timeBetweenInSec > minuteLength) {
        time = Math.floor(timeBetweenInSec / minuteLength);
        if(time === 1) {
            return `${time} ${dictionary.minute} ${dictionary.ago}`;
        } else {
            return `${time} ${dictionary.minutes} ${dictionary.ago}`;
        }
    }
  
    return timeBetweenInSec.toString();
}