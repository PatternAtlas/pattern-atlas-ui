import { UserRole } from './role.model';

export interface PAUser {
    id: string,
    password: string,
    issueRatings: any[],
    comments: any,
    roles: UserRole[],
    email: string,
    name: string,
}
