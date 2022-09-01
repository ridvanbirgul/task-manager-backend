import { RunResult } from 'sqlite3';
import { ApiResponse, ApiListResponse } from '../models/api-model';
import { TaskContract } from '../models/task-contract';
import ManagerBase from './manager-base';

class TaskManager extends ManagerBase<TaskContract> {
    async crudOperation(): Promise<ApiResponse> {
        let res: ApiResponse = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
        };
        if (this.contract.TaskId) {
            let query =
                'UPDATE Task SET ProjectId=?,TeammateId=?,TaskDescription=?,TaskStatus=?,StartDate=?,EndDate=?,ActualStartDate=?,ActualEndDate=? WHERE TaskId=?';
            await this.dbm.Database.execute<RunResult>(query, [
                this.contract.ProjectId,
                this.contract.TeammateId,
                this.contract.TaskDescription,
                this.contract.TaskStatus,
                this.contract.StartDate,
                this.contract.EndDate,
                this.contract.ActualStartDate,
                this.contract.ActualEndDate,
                this.contract.TaskId,
            ]).catch((err: Error) => {
                res.Code = 100;
                res.IsSuccess = false;
                res.Message = err.stack || err.message;
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
    async getList(): Promise<ApiListResponse<TaskContract>> {
        let res: ApiListResponse<TaskContract> = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
            Data: [],
        };

        let paramList: any[] = [];
        let query = 'SELECT * FROM Task WHERE 1=1';
        if (this.contract.ProjectId > 0) {
            query += ' ProjectId=? ';
            paramList.push(this.contract.ProjectId);
        }
        if (this.contract.TeammateId > 0) {
            query += ' AND TeammateId=? ';
            paramList.push(this.contract.TeammateId);
        }
        if (this.contract.TaskStatus.valueOf() > 0) {
            query += ' AND TaskStatus=? ';
            paramList.push(this.contract.TaskStatus);
        }

        query += ' LIMIT 100 ';

        this.dbm.Database.select<TaskContract>(query, paramList)
            .then((result: Array<TaskContract>) => {
                res.Data.push(...result);
            })
            .catch((error: Error) => {
                res.Code = 100;
                res.Message = error.stack || error.message;
                res.IsSuccess = false;
            });

        return res;
    }
}

export default TaskManager;
