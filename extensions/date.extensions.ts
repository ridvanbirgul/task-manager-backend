interface Date {
    toYYYYMMDDString(): string;
    getDefaultDate(): Date;
}

Date.prototype.toYYYYMMDDString = function (): string {
    let year = this.getFullYear();
    let month = this.getUTCMonth() + 1;
    let day = this.getDate();

    return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
};

Date.prototype.getDefaultDate = function (): Date {
    return new Date('1900-01-01');
};
