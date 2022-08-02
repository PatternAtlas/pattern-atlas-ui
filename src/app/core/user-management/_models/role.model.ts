import { PrivilegeModel } from './privilege.model';

export class RoleModel {
    id: string;
    name: string;
    // privileges: PrivilegeModel[];
    privileges: string[];
}
