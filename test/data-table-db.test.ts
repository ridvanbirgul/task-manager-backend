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

describe('Test of datacontract CRUD operations', () => {
    let dbm: DatabaseManager;

    beforeAll(() => {
        dbm = new DatabaseManager(new SqLiteDatabase());
    });

    test('ProjectContract_Insert', async () => {
        let dt = new ProjectContract(11, 'Deneme Projesi', ProjectStatus.New);
        dbm.Database.insert(dt)
            .then((result: RunResult) => {
                expect(result.lastID).toBeGreaterThan(0);
            })
            .catch((err: Error) => {
                expect(err).toBeNaN();
            });
    });

    test('TaskContract_Insert', () => {
        let dt = new TaskContract(
            1,
            1,
            'Deneme Task',
            TaskStatus.None,
            new Date('2022-09-01'),
            new Date('2022-09-30'),
            Date.prototype.getDefaultDate(),
            Date.prototype.getDefaultDate()
        );

        dbm.Database.insert(dt)
            .then((result: RunResult) => {
                expect(result.lastID).toBeGreaterThan(0);
            })
            .catch((err: Error) => {
                expect(err).toBeNaN();
            });
    });

    test('TeammateContract_Insert', () => {
        let dt = new TeammateContract('Rıdvan Birgül', TeammateRole.SeniorDeveloper, RecordStatus.Active);
        dbm.Database.insert(dt)
            .then((result: RunResult) => {
                expect(result.lastID).toBeGreaterThan(0);
            })
            .catch((err: Error) => {
                expect(err).toBeNaN();
            });
    });

    test('TaskNoteContract_Insert', () => {
        let dt = new TaskNoteContract(1, 'Unit test task');
        dbm.Database.insert(dt)
            .then((result: RunResult) => {
                expect(result.lastID).toBeGreaterThan(0);
            })
            .catch((err: Error) => {
                expect(err).toBeNaN();
            });
    });

    test('ProjectContract_Select', () => {
        dbm.Database.select<ProjectContract>('SELECT * FROM Project')
            .then((result: Array<ProjectContract>) => {
                expect(result.length).toBeGreaterThan(0);
            })
            .catch((err: Error) => {
                expect(err).toBeNaN();
            });
    });
});
