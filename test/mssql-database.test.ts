import MsSqlDatabase from '../dao/mssql-database';
import { TeammateContract } from '../models/teammate-contract';
describe.only('Ms Sql connection test', () => {
    test('Test connection', async () => {
        let mssql = new MsSqlDatabase();
        const paramList: Array<any> = [{ key: 'teammateId', value: 1 }];
        let result = await mssql.select<TeammateContract>(
            'SELECT * FROM Teammate WHERE TeammateId=@teammateId',
            paramList
        );
        expect(result.length).toBeGreaterThan(0);
    });
});
