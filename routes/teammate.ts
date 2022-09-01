import express, { Request, Response } from 'express';
import SqLiteDatabase from '../dao/sqlite-database';
import DatabaseManager from '../managers/database-manager';
import TeammateManager from '../managers/teammate-manager';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import { RecordStatus } from '../models/record-status';
import { TeammateContract } from '../models/teammate-contract';

const router = express.Router();

interface ITeammateCrudRequest {
    TeammateContract: TeammateContract;
}

router.post('/crud', async (req: Request<{}, {}, ITeammateCrudRequest>, res: Response) => {
    let teammate: TeammateContract = new TeammateContract(
        req.body.TeammateContract.TeammateId,
        req.body.TeammateContract.TeammateName,
        req.body.TeammateContract.TeammateRole,
        req.body.TeammateContract.TeammateStatus
    );
    let tm = new TeammateManager(new SqLiteDatabase(), teammate);
    tm.crudOperation().then((result: ApiResponse) => {
        res.json(result);
    });
});

interface ITeammateListRequest {
    TeammateStatus: RecordStatus;
}

router.get('/list/:TeammateStatus', async (req: Request<ITeammateListRequest, {}, {}>, res: Response) => {
    let teammate: TeammateContract = new TeammateContract();
    teammate.TeammateStatus = req.params.TeammateStatus;
    let tm = new TeammateManager(new SqLiteDatabase(), teammate);
    tm.getList().then((result: ApiListResponse<TeammateContract>) => {
        res.json(result);
    });
});

export { router as TeammateRouter };
