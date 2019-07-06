import { GithubFileResponse } from './GithubFileResponse.interface';

export interface GithubCommitResponse {
  commit: {
    author: {
      name: 'Manuela Weigold',
      email: 'st159210@stud.uni-stuttgart.de',
      date: '2019-05-05T13:04:55Z'
    }
    committer: {
      name: string;
      email: string;
      date: string;
    }
    html_url: string;
    message: string;
    node_id: string;
    parents: any;
    sha: string;
    tree: any;
    url: string;
    verification: any;
  };
  content: GithubFileResponse;
  _links: {
    self: string;
    git: string;
    html: string;
  }
}
