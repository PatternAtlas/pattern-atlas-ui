import { HttpHeaders } from '@angular/common/http';

export interface GithubConfigFile {
  committer: {
    name: string;
    email: string;
  },
  headers: HttpHeaders;
}
