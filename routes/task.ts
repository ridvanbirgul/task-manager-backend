import express, { Request, Response } from 'express';
import SqLiteDatabase from '../dao/sqlite-database';
import TaskManager from '../managers/task-manager';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import { TaskContract } from '../models/task-contract';

const router = express.Router();

interface ITaskRouterRequest {
    Task: TaskContract;
}

router.post('/crud', async (req: Request<{}, {}, ITaskRouterRequest>, res: Response) => {
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

router.post('/list', (req: Request<{}, {}, ITaskRouterRequest>, res: Response) => {
    let tm = new TaskManager(new SqLiteDatabase(), req.body.Task);
    tm.getList().then((result: ApiListResponse<TaskContract>) => {
        res.json(result);
    });
});

export { router as TaskRouter };
