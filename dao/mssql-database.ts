import sql, { config, ConnectionPool, IResult } from 'mssql';
import { IDatabase } from './dao-base';
import { IDataTable } from './table-base';
const { VarChar } = require('mssql/msnodesqlv8');

const config: config = {
    database: 'TaskManager',
    server: 'DESKTOP-CJVDCHP\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    },
};

class MsSqlDatabase implements IDatabase {
    constructor() {}
    async select<T>(query: string, params?: any[] | undefined): Promise<T[]> {
        const pool = await sql.connect(config);
        const request = pool.request();
        params?.forEach((param: any) => {
            request.input(param.key, param.value);
        });
        const response = await request.query<IResult<T>>(query);
        let returnArr: Array<T> = [];
        await response?.recordset.map((value: IResult<T>) => {
            returnArr.push(value as T);
        });
        pool.close();
        return returnArr;
    }
    async insert<IResult>(data: IDataTable): Promise<IResult> {
        const pool = await sql.connect(config);
        const request = pool.request();
        const params = data.getColumns(this);
        params?.forEach((param: any) => {
            request.input(param.key, param.value);
        });
        const response = await request.query<IResult>(
            data.generateInsertStatement(this) + ';SELECT SCOPE_IDENTITY() AS id;'
        );
        pool.close();
        return response.recordset[0];
    }

    async execute<T>(query: string, params?: any[] | undefined): Promise<T> {
        const pool = await sql.connect(config);
        const request = pool.request();
        params?.forEach((param: any) => {
            request.input(param.key, param.value);
        });

        const response = await request.query<T>(query);
        pool.close();
        return response.recordset[0];
    }
}

export default MsSqlDatabase;
