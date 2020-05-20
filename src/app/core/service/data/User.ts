export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    USER_MANAGER = 'USER_MANAGER'
}

export class User {

    id: number;
    email: string;
    role: Role;

    constructor(data: any = null) {
        if (data) {
            this.id = Number(data.id);
            this.email = String(data.email);
            this.role = Role[String(data.role)];
        }
    }
}