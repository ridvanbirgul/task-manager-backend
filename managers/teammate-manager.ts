import { RunResult } from 'sqlite3';
import { ApiResponse, ApiListResponse } from '../models/api-model';
import { TaskContract } from '../models/task-contract';
import { TeammateContract } from '../models/teammate-contract';
import ManagerBase from './manager-base';

class TeammateManager extends ManagerBase<TeammateContract> {
    async crudOperation(): Promise<ApiResponse> {
        let res: ApiResponse = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
        };
        if (this.contract.TeammateId) {
            let query = 'UPDATE Teammate SET TeammateName=?,TeammateRole=?,TeammateStatus=? WHERE TeammateId=?';
            await this.dbm.Database.execute<RunResult>(query, [
                this.contract.TeammateName,
                this.contract.TeammateRole,
                this.contract.TeammateStatus,
                this.contract.TeammateId,
            ]).catch((err: Error) => {
                res.Code = 100;
                res.IsSuccess = false;
                res.Message = err.message;
            });
        } else {
            await this.dbm.Database.insert<RunResult>(this.contract)
                .then((result: RunResult) => {
                    res.LastCreatedId = result.lastID;
                })
                .catch((err: Error) => {
                    res.Code = 100;
                    res.IsSuccess = false;
                    res.Message = err.stack || err.message;
                });
        }
        return res;
    }
    async getList(): Promise<ApiListResponse<TeammateContract>> {
        let paramList: Array<any> = [];
        let query = 'SELECT * FROM Teammate';
        if (this.contract.TeammateStatus.valueOf() > 0) {
            query = 'SELECT * FROM Teammate WHERE TeammateStatus=?';
            paramList.push(this.contract.TeammateStatus);
        }

        let res: ApiListResponse<TeammateContract> = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
            Data: [],
        };

        await this.dbm.Database.select<TeammateContract>(query, paramList)
            .then((result: Array<TeammateContract>) => {
                res.Data.push(...result);
            })
            .catch((err: Error) => {
                res.Code = 100;
                res.IsSuccess = false;
                res.Message = err.stack || err.message;
            });

        return res;
    }
}

export default TeammateManager;
