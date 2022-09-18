import express, { Request, Response } from 'express';
import { cloneDeep } from 'lodash';
import SqLiteDatabase from '../dao/sqlite-database';
import TaskManager from '../managers/task-manager';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import { TaskContract, TaskContractInitialize } from '../models/task-contract';
import { TaskStatus } from '../models/task-status';

const router = express.Router();

interface ITaskCrudRequest {
    Task: TaskContract;
}

interface ITaskListRequest {
    ProjectId: number;
    TeammateId: number;
    TaskStatus: TaskStatus;
}

router.post('/crud', async (req: Request<{}, {}, ITaskCrudRequest>, res: Response) => {
    let task: TaskContract = new TaskContract(
        req.body.Task.TaskId,
        req.body.Task.ProjectId,
        req.body.Task.TeammateId,
        req.body.Task.TaskDescription,
        req.body.Task.TaskStatus,
        req.body.Task.StartDate,
        req.body.Task.EndDate,
        req.body.Task.ActualStartDate,
        req.body.Task.ActualEndDate
    );
    let taskManager = new TaskManager(new SqLiteDatabase(), task);
    taskManager.crudOperation().then((result: ApiResponse) => {
        res.json(result);
    });
});

router.get('/list', (req: Request<{}, {}, {}, ITaskListRequest>, res: Response) => {
    let task = new TaskContract();
    task.ProjectId = req.query.ProjectId || 0;
    task.TeammateId = req.query.TeammateId || 0;
    task.TaskStatus = req.query.TaskStatus || TaskStatus.None;

    let tm = new TaskManager(new SqLiteDatabase(), task);
    tm.getList().then((result: ApiListResponse<TaskContract>) => {
        res.json(result);
    });
});

export { router as TaskRouter };
