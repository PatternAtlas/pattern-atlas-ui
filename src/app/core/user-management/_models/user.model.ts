import { UserRole } from './role.enum';
import { Issue } from '../../issue-management';
import { PAComment } from '../../shared';
import { RoleModel } from './role.model';

export class PAUser {
    // USER INFO
    id: string;
    private _role: UserRole;
    roles: RoleModel[];
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
      this._role = _role;
    }

    public get role() {
      if(!this._role) {
        // Extracts the platform wide role from list of roles
        if(this.roles) {
          for (let role of this.roles) {
            // Check if the role is one of the platform-wide roles in UserRoles
            if(Object.values(UserRole).includes(role.name as UserRole)) {
              this._role = (role.name as UserRole)
            }
          }
        }
      }
      return this._role;
    }

    public set role(role: UserRole) {
      // removes old platform wide role from role list and sets new one
      let currentRole = this.role;

      // Find rolemodel associated with the platform wide role
      if(this.roles) {
        for (let i = 0; i < this.roles.length; i++) {
          if (this.roles[i].name == currentRole) {
            this.roles.splice(i, 1);
            break;
          }
        }
      } else {
        this.roles = []
      }

      let newRole : RoleModel = {
        id: null,
        name: role,
        privileges: []
      }
      this.roles.push(newRole)
      this._role = role;
    }

}
