class DateUtils {
    static toYYYYMMDDString(date: Date): string {
        let year = date.getFullYear();
        let month = date.getUTCMonth() + 1;
        let day = date.getDate();

        return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
    }

    static getDefaultDate(): Date {
        return new Date('1900-01-01');
    }
}

export default DateUtils;
