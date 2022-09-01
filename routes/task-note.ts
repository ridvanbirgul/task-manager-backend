import express, { Router, Request, Response } from 'express';
import SqLiteDatabase from '../dao/sqlite-database';
import TaskNoteManager from '../managers/task-note-manager';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import { TaskNoteContract } from '../models/task-note-contract';
const router: Router = express.Router();

interface ITaskNoteRouterRequest {
    TaskNote: TaskNoteContract;
}

router.post('/crud', (req: Request<{}, {}, ITaskNoteRouterRequest>, res: Response) => {
    let taskNote: TaskNoteContract = new TaskNoteContract(
        req.body.TaskNote.TaskNoteId,
        req.body.TaskNote.TaskId,
        req.body.TaskNote.TaskDescription
    );
    let tnm = new TaskNoteManager(new SqLiteDatabase(), taskNote);
    tnm.crudOperation().then((result: ApiResponse) => {
        res.json(result);
    });
});

router.get('/list', (req: Request<{}, {}, ITaskNoteRouterRequest>, res: Response) => {
    let taskNote: TaskNoteContract = new TaskNoteContract(
        req.body.TaskNote.TaskNoteId,
        req.body.TaskNote.TaskId,
        req.body.TaskNote.TaskDescription
    );
    let tnm = new TaskNoteManager(new SqLiteDatabase(), taskNote);
    tnm.getList().then((result: ApiListResponse<TaskNoteContract>) => {
        res.json(result);
    });
});

export { router as TaskNoteRouter };
