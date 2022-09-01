import { cloneDeep } from 'lodash';
import { IDatabase } from '../dao/dao-base';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import DatabaseManager from './database-manager';

abstract class ManagerBase<Type> {
    protected dbm: DatabaseManager;
    protected contract: Type;
    constructor(db: IDatabase, contract: Type) {
        this.dbm = new DatabaseManager(db);
        this.contract = cloneDeep(contract);
    }

    abstract crudOperation(): Promise<ApiResponse>;

    abstract getList(): Promise<ApiListResponse<Type>>;
}

export default ManagerBase;
