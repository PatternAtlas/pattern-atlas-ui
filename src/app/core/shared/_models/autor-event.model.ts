import { AuthorModel, AuthorModelRequest } from '../../author-management';

export class AuthorEventModel {
  author: AuthorModel;
  authorModelRequest: AuthorModelRequest;

  constructor(_author: AuthorModel, _authorModelRequest: AuthorModelRequest) {
    this.author = _author;
    this.authorModelRequest = _authorModelRequest;
  }
}
