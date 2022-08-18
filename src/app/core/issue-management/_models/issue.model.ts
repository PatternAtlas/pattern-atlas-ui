import { AuthorModel } from '../../author-management';
import { PAEvidence } from '../../shared';
import { PAComment } from '../../shared/_models/comment.model';

export class Issue {
    authors: AuthorModel[];
    comments: PAComment[];
    evidences: PAEvidence[];
    description: string;
    id: string;
    name: string;
    rating: number;
    upVotes: string[];
    downVotes: string[];
    uri: string;
    version: string;
}
