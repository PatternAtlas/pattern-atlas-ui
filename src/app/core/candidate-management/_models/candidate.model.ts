import { PAComment } from "../../shared/_models/comment.model";
import { AuthorModel } from "../../author-management";

export class Candidate {
  authors: AuthorModel[];
  comments: PAComment[];
  content: string;
  iconUrl: any;
  id: string;
  name: string;
  patternLanguageId: string;
  patternLanguageName: string;
  upVotes: string[];
  downVotes: string[];
  uri: string;
  version: string = '0.1.0';

  constructor()
  constructor(_content: string, _name: string, _patternLanguageId: string, _authors: AuthorModel[])
  constructor(_content?: string, _name?: string, _patternLanguageId?: string, _authors?: AuthorModel[]) {
    this.content = _content;
    this.name = _name;
    this.patternLanguageId = _patternLanguageId;
    this.authors = _authors;
  }
}