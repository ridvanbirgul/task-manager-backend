interface IDataTable {
    generateInsertStatement(): string;
    getColumns(): Array<any>;
}

export { IDataTable };
