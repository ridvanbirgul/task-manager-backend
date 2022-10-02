import { IDataTable } from '../dao/table-base';
import { TaskStatus } from './task-status';
import '../util/date-utils';
import DateUtils from '../util/date-utils';
import { IDatabase } from '../dao/dao-base';
import SqLiteDatabase from '../dao/sqlite-database';

class TaskContract implements IDataTable {
    private taskId: number;
    private projectId: number;
    private teammateId: number;
    private taskName: string;
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
        taskName: string = '',
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
        this.taskName = taskName;
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
    get TaskName(): string {
        return this.taskName;
    }
    set TaskName(_taskName: string) {
        this.taskName = _taskName;
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

    generateInsertStatement(db: IDatabase): string {
        if (db instanceof SqLiteDatabase) {
            return `INSERT INTO Task(ProjectId,TeammateId,TaskName,TaskDescription,TaskStatus,StartDate,EndDate,ActualStartDate,ActualEndDate) VALUES(?,?,?,?,?,?,?,?,?)`;
        } else {
            return `INSERT INTO Task(ProjectId,TeammateId,TaskName,TaskDescription,TaskStatus,StartDate,EndDate,ActualStartDate,ActualEndDate) VALUES(@projectId,@teammateId,@taskName,@taskDescription,@taskStatus,@startDate,@endDate,@actualStartDate,@actualEndDate)`;
        }
    }
    getColumns(db: IDatabase): any[] {
        if (db instanceof SqLiteDatabase) {
            return [
                this.projectId,
                this.teammateId,
                this.TaskName,
                this.taskDescription,
                this.taskStatus,
                DateUtils.toYYYYMMDDString(this.startDate),
                DateUtils.toYYYYMMDDString(this.endDate),
                DateUtils.toYYYYMMDDString(this.actualStartDate),
                DateUtils.toYYYYMMDDString(this.actualEndDate),
            ];
        } else {
            return [
                { key: 'projectId', value: this.projectId },
                { key: 'teammateId', value: this.teammateId },
                { key: 'taskName', value: this.taskName },
                { key: 'taskDescription', value: this.taskDescription },
                { key: 'taskStatus', value: this.taskStatus },
                { key: 'startDate', value: DateUtils.toYYYYMMDDString(this.startDate) },
                { key: 'endDate', value: DateUtils.toYYYYMMDDString(this.endDate) },
                { key: 'actualStartDate', value: DateUtils.toYYYYMMDDString(this.actualStartDate) },
                { key: 'actualEndDate', value: DateUtils.toYYYYMMDDString(this.actualEndDate) },
            ];
        }
    }
}

export const TaskContractInitialize: TaskContract = new TaskContract(
    0,
    0,
    0,
    '',
    '',
    TaskStatus.None,
    new Date(),
    new Date(),
    DateUtils.DefaultDate,
    DateUtils.DefaultDate
);

export { TaskContract };
