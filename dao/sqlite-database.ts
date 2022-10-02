import sqlite3, { Database, RunResult } from 'sqlite3';
import { IDatabase } from './dao-base';
import { IDataTable } from './table-base';

class SqLiteDatabase implements IDatabase {
    private database: Database;

    constructor() {
        const SQLite3 = sqlite3.verbose();
        this.database = new SQLite3.Database(process.env.DATABASE_URL!);
    }

    select<T>(query: string, params?: any[]): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            this.database!.all(query, params, function (err: Error, rows: Array<T>) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insert<RunResult>(data: IDataTable): Promise<RunResult> {
        return new Promise((resolve, reject) => {
            this.database.run(data.generateInsertStatement(this), data.getColumns(this), function (err: Error) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this as unknown as RunResult);
                }
            });
        });
    }
    execute<RunResult>(query: string, params: any[]): Promise<RunResult> {
        return new Promise((resolve, reject) => {
            this.database.run(query, params, function (err: Error) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this as unknown as RunResult);
                }
            });
        });
    }
}

export default SqLiteDatabase;
