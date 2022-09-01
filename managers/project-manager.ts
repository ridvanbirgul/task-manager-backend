import { cloneDeep } from 'lodash';
import { RunResult } from 'sqlite3';
import SqLiteDatabase from '../dao/sqlite-database';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import { ProjectContract } from '../models/project-contract';
import { ProjectStatus } from '../models/project-status';
import DatabaseManager from './database-manager';
import ManagerBase from './manager-base';

class ProjectManager extends ManagerBase<ProjectContract> {
    async crudOperation(): Promise<ApiResponse> {
        let dbm = new DatabaseManager(new SqLiteDatabase());
        let res: ApiResponse = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
        };
        if (this.contract) {
            if (this.contract.ProjectId) {
                let query = `UPDATE Project SET ProjectName=?,ProjectStatus=? WHERE ProjectId=?`;
                await dbm.Database.execute<RunResult>(query, [
                    this.contract.ProjectName,
                    this.contract.ProjectStatus,
                    this.contract.ProjectId,
                ]).catch((err: Error) => {
                    res.Code = 100;
                    res.IsSuccess = false;
                    res.Message = err.stack || err.message;
                });
            } else {
                await dbm.Database.insert<RunResult>(this.contract)
                    .then((result: RunResult) => {
                        res.LastCreatedId = result.lastID;
                    })
                    .catch((err: Error) => {
                        res.Code = 100;
                        res.IsSuccess = false;
                        res.Message = err.stack || err.message;
                    });
            }
        }
        return res;
    }

    async getList(): Promise<ApiListResponse<ProjectContract>> {
        let dbm = new DatabaseManager(new SqLiteDatabase());
        let res: ApiListResponse<ProjectContract> = {
            Code: 0,
            IsSuccess: true,
            LastCreatedId: 0,
            Message: '',
            Data: [],
        };
        await dbm.Database.select<ProjectContract>(`SELECT * FROM Project WHERE ProjectStatus=?`, [
            this.contract.ProjectStatus,
        ])
            .then((result: Array<ProjectContract>) => {
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

export default ProjectManager;
