import { IDatabase } from '../dao/dao-base';

class DatabaseManager {
    private database: IDatabase;

    constructor(database: IDatabase) {
        this.database = database;
    }

    get Database(): IDatabase {
        return this.database;
    }
}

export default DatabaseManager;
