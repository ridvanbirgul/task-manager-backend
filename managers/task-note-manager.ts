import { RunResult } from 'sqlite3';
import { ApiResponse, ApiListResponse } from '../models/api-model';
import { TaskNoteContract } from '../models/task-note-contract';
import ManagerBase from './manager-base';

class TaskNoteManager extends ManagerBase<TaskNoteContract> {
    async crudOperation(): Promise<ApiResponse> {
        let res: ApiResponse = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
        };

        if (this.contract.TaskNoteId > 0) {
            let query: string = 'UPDATE TaskNote SET TaskId=?,TaskDescription=? WHERE TaskNoteId=?';
            this.dbm.Database.execute<RunResult>(query, [
                this.contract.TaskId,
                this.contract.TaskDescription,
                this.contract.TaskNoteId,
            ]).catch((err: Error) => {
                res.Code = 100;
                res.IsSuccess = false;
                res.Message = err.message;
            });
        } else {
            this.dbm.Database.insert<RunResult>(this.contract)
                .then((result: RunResult) => {
                    res.LastCreatedId = result.lastID;
                })
                .catch((err: Error) => {
                    res.Code = 100;
                    res.IsSuccess = false;
                    res.Message = err.message;
                });
        }

        return res;
    }
    async getList(): Promise<ApiListResponse<TaskNoteContract>> {
        let res: ApiListResponse<TaskNoteContract> = {
            Code: 0,
            Data: [],
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
        };

        let query: string = 'SELECT * FROM TaskNote';
        this.dbm.Database.select<TaskNoteContract>(query)
            .then((result: Array<TaskNoteContract>) => {
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

export default TaskNoteManager;
