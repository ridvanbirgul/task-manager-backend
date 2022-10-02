import { IDatabase } from './dao-base';

interface IDataTable {
    generateInsertStatement(db: IDatabase): string;
    getColumns(db: IDatabase): Array<any>;
}

export { IDataTable };
