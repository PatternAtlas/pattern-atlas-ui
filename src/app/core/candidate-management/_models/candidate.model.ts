import { PAComment } from '../../shared/_models/comment.model';
import { AuthorModel } from '../../author-management';
import { PAEvidence } from '../../shared/_models/evidence.model';
import { RatingModel } from '../../shared';

export class Candidate {
  authors: AuthorModel[];
  comments: PAComment[];
  evidences: PAEvidence[];
  content: any;
  iconUrl: any;
  id: string;
  issueId: string;
  name: string;
  patternLanguageId: string;
  patternLanguageName: string;
  ratingReadability: number;
  ratingUnderstandability: number;
  ratingAppropriateness: number;
  readability: RatingModel[];
  understandability: RatingModel[];
  appropriateness: RatingModel[]
  uri: string;
  version = '0.1.0';

  constructor()
  constructor(_content: any, _name: string, _patternLanguageId: string, _authors: AuthorModel[])
  constructor(_content: any, _name: string, _patternLanguageId: string, _authors: AuthorModel[], _issueId: string)
  constructor(_content?: any, _name?: string, _patternLanguageId?: string, _authors?: AuthorModel[], _issueId?: string) {
    this.content = _content;
    this.name = _name;
    this.patternLanguageId = _patternLanguageId;
    this.authors = _authors;
    this.issueId = _issueId;
  }
}
