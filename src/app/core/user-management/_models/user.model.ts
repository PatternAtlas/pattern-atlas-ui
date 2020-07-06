import { UserRole } from './role.enum';
import { Issue } from '../../issue-management';
import { PAComment } from '../../shared';

export class PAUser {
    // USER INFO
    id: string;
    role: UserRole;
    email: string;
    name: string;
    // ISSUE 
    issues: Issue[];
    issueComments: PAComment[];
    issueRatings: Issue[];
    // RESPONSE
    password: string;
    oldPassword: string;

    constructor()
    constructor(_role: UserRole) 
    constructor(_role?: UserRole) {
      this.role = _role;
    }

}
