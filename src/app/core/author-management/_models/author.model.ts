export class AuthorModel {
    userId: string;
    authorRole: string;
    name: string;

    constructor()
    constructor(_userId: string, _authorRole: string, _name: string)
    constructor(_userId?: string, _authorRole?: string, _name?: string) {
      this.userId = _userId;
      this.authorRole = _authorRole;
      this.name = _name;
    }
}
