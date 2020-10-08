export class AuthorModelRequest {

    authorRole: string;
    userId: string;

    constructor(_authorRole: string, _userId: string) {
      this.authorRole = _authorRole;
      this.userId = _userId;
    }
}
