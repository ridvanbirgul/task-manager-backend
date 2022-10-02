import { RunResult } from 'sqlite3';
import SqLiteDatabase from '../dao/sqlite-database';
import DatabaseManager from '../managers/database-manager';
import { ProjectContract } from '../models/project-contract';
import { ProjectStatus } from '../models/project-status';
import { RecordStatus } from '../models/record-status';
import { TaskContract } from '../models/task-contract';
import { TaskNoteContract } from '../models/task-note-contract';
import { TaskStatus } from '../models/task-status';
import { TeammateContract } from '../models/teammate-contract';
import { TeammateRole } from '../models/teammate-role';
import DateUtils from '../util/date-utils';

describe('Test of datacontract CRUD operations', () => {
    test('Empty test',()=>{
        expect(true).toBeTruthy();
    })
    // let dbm: DatabaseManager;
    // beforeAll(() => {
    //     dbm = new DatabaseManager(new SqLiteDatabase());
    // });
    // test('ProjectContract_Insert', async () => {
    //     // let dt = new ProjectContract(0, 11, 'Deneme Projesi', ProjectStatus.New);
    //     // dbm.Database.insert<RunResult>(dt)
    //     //     .then((result: RunResult) => {
    //     //         expect(result.lastID).toBeGreaterThan(0);
    //     //     })
    //     //     .catch((err: Error) => {
    //     //         expect(err).toBeNaN();
    //     //     });
    // });
    // test('TaskContract_Insert', () => {
    //     let dt = new TaskContract(
    //         0,
    //         1,
    //         1,
    //         'Deneme Task',
    //         TaskStatus.None,
    //         new Date('2022-09-01'),
    //         new Date('2022-09-30'),
    //         DateUtils.DefaultDate,
    //         DateUtils.DefaultDate
    //     );
    //     dbm.Database.insert<RunResult>(dt)
    //         .then((result: RunResult) => {
    //             expect(result.lastID).toBeGreaterThan(0);
    //         })
    //         .catch((err: Error) => {
    //             expect(err).toBeNaN();
    //         });
    // });
    // test('TeammateContract_Insert', () => {
    //     let dt = new TeammateContract(0, 'Rıdvan Birgül', TeammateRole.SeniorDeveloper, RecordStatus.Active);
    //     dbm.Database.insert<RunResult>(dt)
    //         .then((result: RunResult) => {
    //             expect(result.lastID).toBeGreaterThan(0);
    //         })
    //         .catch((err: Error) => {
    //             expect(err).toBeNaN();
    //         });
    // });
    // test('TaskNoteContract_Insert', () => {
    //     let dt = new TaskNoteContract(0, 1, 'Unit test task');
    //     dbm.Database.insert<RunResult>(dt)
    //         .then((result: RunResult) => {
    //             expect(result.lastID).toBeGreaterThan(0);
    //         })
    //         .catch((err: Error) => {
    //             expect(err).toBeNaN();
    //         });
    // });
    // test('ProjectContract_Select', () => {
    //     dbm.Database.select<ProjectContract>('SELECT * FROM Project')
    //         .then((result: Array<ProjectContract>) => {
    //             expect(result.length).toBeGreaterThan(0);
    //         })
    //         .catch((err: Error) => {
    //             expect(err).toBeNaN();
    //         });
    // });
});
