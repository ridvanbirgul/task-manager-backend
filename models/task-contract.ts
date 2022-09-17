import { IDataTable } from '../dao/table-base';
import { TaskStatus } from './task-status';
import '../util/date-utils';
import DateUtils from '../util/date-utils';

class TaskContract implements IDataTable {
    private taskId: number;
    private projectId: number;
    private teammateId: number;
    private taskDescription: string;
    private taskStatus: TaskStatus;
    private startDate: Date;
    private endDate: Date;
    private actualStartDate: Date;
    private actualEndDate: Date;

    constructor(
        taskId: number = 0,
        projectId: number = 0,
        teammateId: number = 0,
        taskDescription: string = '',
        taskStatus: TaskStatus = TaskStatus.None,
        startDate: Date = DateUtils.DefaultDate,
        endDate: Date = DateUtils.DefaultDate,
        actualStartDate: Date = DateUtils.DefaultDate,
        actualEndDate: Date = DateUtils.DefaultDate
    ) {
        this.taskId = taskId;
        this.projectId = projectId;
        this.teammateId = teammateId;
        this.taskDescription = taskDescription;
        this.taskStatus = taskStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.actualStartDate = actualStartDate;
        this.actualEndDate = actualEndDate;
    }

    get TaskId(): number {
        return this.taskId;
    }
    set TaskId(taskId: number) {
        this.taskId = taskId;
    }
    get ProjectId(): number {
        return this.projectId;
    }
    set ProjectId(_projectId: number) {
        this.projectId = _projectId;
    }
    get TeammateId(): number {
        return this.teammateId;
    }
    set TeammateId(_teammateId: number) {
        this.teammateId = _teammateId;
    }
    get TaskDescription(): string {
        return this.taskDescription;
    }
    set TaskDescription(_taskDescription: string) {
        this.taskDescription = _taskDescription;
    }
    get TaskStatus(): TaskStatus {
        return this.taskStatus;
    }
    set TaskStatus(_taskStatus: TaskStatus) {
        this.taskStatus = _taskStatus;
    }
    get StartDate(): Date {
        return this.startDate;
    }
    set StartDate(_startDate: Date) {
        this.startDate = _startDate;
    }
    get EndDate(): Date {
        return this.endDate;
    }
    set EndDate(_endDate: Date) {
        this.endDate = _endDate;
    }
    get ActualStartDate(): Date {
        return this.actualStartDate;
    }
    set ActualStartDate(_actualStartDate: Date) {
        this.actualStartDate = _actualStartDate;
    }
    get ActualEndDate(): Date {
        return this.actualEndDate;
    }
    set ActualEndDate(_actualEndDate: Date) {
        this.actualEndDate = _actualEndDate;
    }
    generateInsertStatement(): string {
        return `INSERT INTO Task(ProjectId,TeammateId,TaskDescription,TaskStatus,StartDate,EndDate,ActualStartDate,ActualEndDate) VALUES(?,?,?,?,?,?,?,?)`;
    }
    getColumns(): any[] {
        return [
            this.projectId,
            this.teammateId,
            this.taskDescription,
            this.taskStatus,
            DateUtils.toYYYYMMDDString(this.startDate),
            DateUtils.toYYYYMMDDString(this.endDate),
            DateUtils.toYYYYMMDDString(this.actualStartDate),
            DateUtils.toYYYYMMDDString(this.actualEndDate),
        ];
    }
}

export { TaskContract };
