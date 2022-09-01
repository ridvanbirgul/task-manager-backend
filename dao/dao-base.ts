import { IDataTable } from './table-base';

interface IDatabase {
    select<T>(query: string, params?: Array<any>): Promise<Array<T>>;
    insert<T>(data: IDataTable): Promise<T>;
    execute<T>(query: string, params?: Array<any>): Promise<T>;
}

export { IDatabase };
