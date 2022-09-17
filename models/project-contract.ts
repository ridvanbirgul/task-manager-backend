import { ProjectStatus } from './project-status';
import { IDataTable } from '../dao/table-base';
import DateUtils from '../util/date-utils';

class ProjectContract implements IDataTable {
    private projectId: number;
    private projectNo: number;
    private projectName: string;
    private projectDescription: string;
    private endDate: Date;
    private actualEndDate: Date;
    private projectStatus: ProjectStatus;

    constructor(
        projectId: number = 0,
        projectNo: number = 0,
        projectName: string = '',
        projectDescription: string = '',
        endDate: Date = DateUtils.DefaultDate,
        actualEndDate: Date = DateUtils.DefaultDate,
        projectStatus: ProjectStatus = ProjectStatus.None
    ) {
        this.projectId = projectId;
        this.projectNo = projectNo;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.endDate = endDate;
        this.actualEndDate = actualEndDate;
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

    get ProjectDescription(): string {
        return this.projectDescription;
    }

    set ProjectDescription(projectDescription: string) {
        this.projectDescription = projectDescription;
    }

    get EndDate(): Date {
        return this.endDate;
    }

    set EndDate(endDate: Date) {
        this.endDate = endDate;
    }

    get ActualEndDate(): Date {
        return this.actualEndDate;
    }

    set ActualEndDate(actualEndDate: Date) {
        this.actualEndDate = actualEndDate;
    }

    get ProjectStatus(): ProjectStatus {
        return this.projectStatus;
    }

    set ProjectStatus(projectStatus: ProjectStatus) {
        this.projectStatus = projectStatus;
    }

    generateInsertStatement(): string {
        return `INSERT INTO Project(ProjectNo,ProjectName,ProjectDescription,EndDate,ActualEndDate,ProjectStatus) VALUES(?,?,?,?,?,?)`;
    }

    getColumns(): any[] {
        return [
            this.ProjectNo,
            this.ProjectName,
            this.ProjectDescription,
            this.EndDate,
            this.ActualEndDate,
            this.ProjectStatus,
        ];
    }
}

export { ProjectContract };
