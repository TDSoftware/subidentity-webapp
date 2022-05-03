import { timeBetween } from "./timeBetween";

describe("timeBetween.ts", () => {
    it("should calculate the time between now and one hour back correctly", () => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setHours(date2.getHours() - 1);
        expect(timeBetween(date1, date2)).toBe("1 hour ago");
    });
    it("should use plural if its more then one hour", () => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setHours(date2.getHours() - 2);
        expect(timeBetween(date1, date2)).toBe("2 hours ago");
    });
    it("should use seconds if less then one minute ago", () => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setSeconds(date2.getSeconds() - 59);
        expect(timeBetween(date1, date2)).toBe("59 seconds ago");
    });
    it("should use days if more then 24 hours ago", () => {
        const date1 = new Date();
        const date2 = new Date();
        date2.setHours(date2.getHours() - 24);
        expect(timeBetween(date1, date2)).toBe("1 day ago");
    });
});