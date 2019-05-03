import { GithubConfigFile } from './GithubConfigFile.interface';
import { GithubFileResponse } from './GithubFileResponse.interface';

export interface GithubUploadRequestInfo {
  config: GithubConfigFile;
  fileInfo: GithubFileResponse;
  content?: string;
}
