// import { ProjectStatus } from '../models/project-status';
// import { RecordStatus } from '../models/record-status';
// import { TaskContract } from '../models/task-contract';
// import { TaskNoteContract } from '../models/task-note-contract';
// import { TaskStatus } from '../models/task-status';
// import { TeammateContract } from '../models/teammate-contract';
// import { TeammateRole } from '../models/teammate-role';
// import '../extensions/date.extensions';
// import { ProjectContract } from '../models/project-contract';
// import DateUtils from '../util/date-utils';

describe('Test of data table classes', () => {
    test('Empty test', () => {
        expect(true).toBeTruthy();
    });
    //     test('Is_ProjectContract_set_and_get_methods_working_properly', () => {
    //         let projectDT = new ProjectContract();
    //         projectDT.ProjectNo = 1;
    //         projectDT.ProjectName = 'Project For Test';
    //         projectDT.ProjectStatus = ProjectStatus.Started;
    //         expect(0).toBe(projectDT.ProjectId);
    //         expect(1).toBe(projectDT.ProjectNo);
    //         expect('Project For Test').toEqual(projectDT.ProjectName);
    //         expect(ProjectStatus.Started).toBe(projectDT.ProjectStatus);
    //     });
    //     test('Is_ProjectContract_returns_correct_insert_script', () => {
    //         // let projectDT = new ProjectContract(0, 1, 'Project For Test', ProjectStatus.New);
    //         // let expectedValue = 'INSERT INTO Project(ProjectNo,ProjectName,ProjectStatus) VALUES(?,?,?)';
    //         // expect(projectDT.generateInsertStatement()).toEqual(expectedValue);
    //     });
    //     test('Is_TeammateContract_set_and_get_methods_working_properly', () => {
    //         let teammateDT = new TeammateContract();
    //         teammateDT.TeammateName = 'Rıdvan Birgül';
    //         teammateDT.TeammateRole = TeammateRole.SeniorDeveloper;
    //         teammateDT.TeammateStatus = RecordStatus.Active;
    //         expect(0).toBe(teammateDT.TeammateId);
    //         expect('Rıdvan Birgül').toEqual(teammateDT.TeammateName);
    //         expect(TeammateRole.SeniorDeveloper).toBe(teammateDT.TeammateRole);
    //         expect(teammateDT.TeammateStatus).toBe(teammateDT.TeammateStatus);
    //     });
    //     test('Is_TeammateContract_returns_correct_insert_script', () => {
    //         let teammateDT = new TeammateContract(0, 'Rıdvan Birgül', TeammateRole.SeniorDeveloper, RecordStatus.Active);
    //         let expectedValue = 'INSERT INTO Teammate(TeammateName,TeammateRole,TeammateStatus) VALUES(?,?,?)';
    //         expect(teammateDT.generateInsertStatement()).toEqual(expectedValue);
    //     });
    //     test('Is_TaskContract_set_and_get_methods_working_properly', () => {
    //         let taskDT = new TaskContract();
    //         taskDT.ProjectId = 123;
    //         taskDT.TeammateId = 10;
    //         taskDT.TaskDescription = 'Deneme taskıdır';
    //         taskDT.TaskStatus = TaskStatus.Started;
    //         taskDT.StartDate = new Date('2022-01-01');
    //         taskDT.EndDate = new Date('2022-12-31');
    //         taskDT.ActualStartDate = DateUtils.DefaultDate;
    //         taskDT.ActualEndDate = DateUtils.DefaultDate;
    //         expect(0).toBe(taskDT.TaskId);
    //         expect(123).toBe(taskDT.ProjectId);
    //         expect(10).toBe(taskDT.TeammateId);
    //         expect('Deneme taskıdır').toEqual(taskDT.TaskDescription);
    //         expect(TaskStatus.Started).toEqual(taskDT.TaskStatus);
    //         expect(new Date('2022-01-01')).toEqual(taskDT.StartDate);
    //         expect(new Date('2022-12-31')).toEqual(taskDT.EndDate);
    //         expect(new Date('1900-01-01')).toEqual(taskDT.ActualStartDate);
    //         expect(new Date('1900-01-01')).toEqual(taskDT.ActualEndDate);
    //     });
    //     test('Is_TaskContract_returns_correct_insert_script', () => {
    //         let taskDT = new TaskContract(
    //             0,
    //             123,
    //             10,
    //             'Deneme taskıdır',
    //             TaskStatus.Started,
    //             new Date('2022-01-01'),
    //             new Date('2022-12-31'),
    //             DateUtils.DefaultDate,
    //             DateUtils.DefaultDate
    //         );
    //         let expectedValue = `INSERT INTO Task(ProjectId,TeammateId,TaskDescription,TaskStatus,StartDate,EndDate,ActualStartDate,ActualEndDate) VALUES(?,?,?,?,?,?,?,?)`;
    //         expect(taskDT.generateInsertStatement()).toEqual(expectedValue);
    //     });
    //     test('Is_TaskNoteContract_set_and_get_methods_working_properly', () => {
    //         let taskNoteDT = new TaskNoteContract(0);
    //         taskNoteDT.TaskId = 153;
    //         taskNoteDT.TaskDescription = 'Deneme task notu';
    //         expect(0).toBe(taskNoteDT.TaskNoteId);
    //         expect(153).toBe(taskNoteDT.TaskId);
    //         expect('Deneme task notu').toEqual(taskNoteDT.TaskDescription);
    //     });
    //     test('Is_TaskNoteContract_returns_correct_insert_script', () => {
    //         let taskNoteDT = new TaskNoteContract(0, 153, 'Deneme task notu');
    //         let expectedValue = 'INSERT INTO TaskNote(TaskId,TaskDescription) VALUES(?,?)';
    //         expect(taskNoteDT.generateInsertStatement()).toEqual(expectedValue);
    //     });
});
