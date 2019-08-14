import { GithubFileResponse } from './GithubFileResponse.interface';

export interface GithubUploadRequestInfo {
  fileInfo: GithubFileResponse;
  content?: string;
}
