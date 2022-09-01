import { ProjectStatus } from './project-status';
import { IDataTable } from '../dao/table-base';

class ProjectContract implements IDataTable {
    private projectId: number;
    private projectNo: number;
    private projectName: string;
    private projectStatus: ProjectStatus;

    constructor(
        projectId: number = 0,
        projectNo: number = 0,
        projectName: string = '',
        projectStatus: ProjectStatus = ProjectStatus.None
    ) {
        this.projectId = projectId;
        this.projectNo = projectNo;
        this.projectName = projectName;
        this.projectStatus = projectStatus;
    }

    get ProjectId(): number {
        return this.projectId;
    }
    set ProjectId(projectId: number) {
        this.projectId = projectId;
    }

    get ProjectNo(): number {
        return this.projectNo;
    }

    set ProjectNo(projectNo: number) {
        this.projectNo = projectNo;
    }

    get ProjectName(): string {
        return this.projectName;
    }

    set ProjectName(projectName: string) {
        this.projectName = projectName;
    }

    get ProjectStatus(): ProjectStatus {
        return this.projectStatus;
    }

    set ProjectStatus(projectStatus: ProjectStatus) {
        this.projectStatus = projectStatus;
    }

    generateInsertStatement(): string {
        return `INSERT INTO Project(ProjectNo,ProjectName,ProjectStatus) VALUES(?,?,?)`;
    }

    getColumns(): any[] {
        return [this.ProjectNo, this.ProjectName, this.ProjectStatus];
    }
}

export { ProjectContract };
