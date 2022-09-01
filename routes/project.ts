import express, { Request, Response } from 'express';
import SqLiteDatabase from '../dao/sqlite-database';
import ProjectManager from '../managers/project-manager';
import { ApiListResponse, ApiResponse } from '../models/api-model';
import { ProjectContract } from '../models/project-contract';
import { ProjectStatus } from '../models/project-status';

const router = express.Router();

interface IProjectRouterCrud {
    ProjectContract: ProjectContract;
}

router.post('/crud', async (req: Request<{}, {}, IProjectRouterCrud>, res: Response, next: any) => {
    let project: ProjectContract = new ProjectContract(
        req.body.ProjectContract.ProjectId,
        req.body.ProjectContract.ProjectNo,
        req.body.ProjectContract.ProjectName,
        req.body.ProjectContract.ProjectStatus
    );
    let projectManager = new ProjectManager(new SqLiteDatabase(), project);
    projectManager.crudOperation().then((result: ApiResponse) => {
        res.json(result);
    });
});

interface IProjectListRequest {
    projectStatus: ProjectStatus;
}

router.get('/list/:projectStatus', async (req: Request<IProjectListRequest>, res: Response) => {
    let contract: ProjectContract = new ProjectContract();
    contract.ProjectStatus = req.params.projectStatus;
    let projectManager = new ProjectManager(new SqLiteDatabase(), contract);
    projectManager.getList().then((result: ApiListResponse<ProjectContract>) => {
        res.json(result);
    });
});

export { router as ProjectRouter };
