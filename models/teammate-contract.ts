import { IDataTable } from '../dao/table-base';
import { RecordStatus } from './record-status';
import { TeammateRole } from './teammate-role';

class TeammateContract implements IDataTable {
    private teammateId: number;
    private teammateName: string;
    private teammateRole: TeammateRole;
    private teammateStatus: RecordStatus;

    constructor(
        teammateId: number = 0,
        teammateName: string = '',
        teammateRole: TeammateRole = TeammateRole.None,
        teammateStatus: RecordStatus = RecordStatus.Active
    ) {
        this.teammateId = teammateId;
        this.teammateName = teammateName;
        this.teammateRole = teammateRole;
        this.teammateStatus = teammateStatus;
    }

    get TeammateId(): number {
        return this.teammateId;
    }
    set TeammateId(teammateId: number) {
        this.teammateId = teammateId;
    }

    get TeammateName(): string {
        return this.teammateName;
    }

    set TeammateName(teammateName: string) {
        this.teammateName = teammateName;
    }

    get TeammateRole(): TeammateRole {
        return this.teammateRole;
    }

    set TeammateRole(teammateRole: TeammateRole) {
        this.teammateRole = teammateRole;
    }

    get TeammateStatus(): RecordStatus {
        return this.teammateStatus;
    }

    set TeammateStatus(teammateStatus: RecordStatus) {
        this.teammateStatus = teammateStatus;
    }

    generateInsertStatement(): string {
        return `INSERT INTO Teammate(TeammateName,TeammateRole,TeammateStatus) VALUES(?,?,?)`;
    }
    getColumns(): any[] {
        return [this.teammateName, this.teammateRole, this.teammateStatus];
    }
}

export { TeammateContract };
