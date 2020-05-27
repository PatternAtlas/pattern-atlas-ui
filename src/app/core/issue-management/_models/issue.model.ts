import { IssueComment } from "./issue-comment.model";

export interface Issue {
    id: string,
    uri: string,
    name: string
    description: string,
    rating: number,
    version: string,
    comments: IssueComment[],
}