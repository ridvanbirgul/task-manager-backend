import { IDatabase } from '../dao/dao-base';
import SqLiteDatabase from '../dao/sqlite-database';
import { IDataTable } from '../dao/table-base';

class TaskNoteContract implements IDataTable {
    private taskNoteId: number;
    private taskId: number;
    private taskDescription: string;

    constructor(taskNoteId: number, taskId: number = 0, taskDescription: string = '') {
        this.taskNoteId = taskNoteId;
        this.taskId = taskId;
        this.taskDescription = taskDescription;
    }

    get TaskNoteId(): number {
        return this.taskNoteId;
    }
    get TaskId(): number {
        return this.taskId;
    }
    set TaskId(_taskId: number) {
        this.taskId = _taskId;
    }
    get TaskDescription(): string {
        return this.taskDescription;
    }
    set TaskDescription(_taskDescription: string) {
        this.taskDescription = _taskDescription;
    }

    generateInsertStatement(db: IDatabase): string {
        if (db instanceof SqLiteDatabase) {
            return `INSERT INTO TaskNote(TaskId,TaskDescription) VALUES(?,?)`;
        } else {
            return `INSERT INTO TaskNote(TaskId,TaskDescription) VALUES(@taskId,@taskDescription)`;
        }
    }
    getColumns(db: IDatabase): any[] {
        if (db instanceof SqLiteDatabase) {
            return [this.taskId, this.taskDescription];
        } else {
            return [
                { key: 'taskId', value: this.taskId },
                { key: 'taskDescription', value: this.taskDescription },
            ];
        }
    }
}

export { TaskNoteContract };
