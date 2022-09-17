class DateUtils {
    static toYYYYMMDDString(date: Date): string {
        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getUTCMonth() + 1;
        let day = newDate.getDate();

        return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
    }

    static DefaultDate = new Date('1900-01-01');
}

export default DateUtils;
