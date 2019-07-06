export interface GithubFileResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: GithubHalLink[];
}


