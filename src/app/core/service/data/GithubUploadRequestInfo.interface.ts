import { GithubFileResponse } from './GithubFileResponse.interface';
import { GithubAppConfig } from './GithubAppConfig.interface';

export interface GithubUploadRequestInfo {
  config: GithubAppConfig;
  fileInfo: GithubFileResponse;
  content?: string;
}
