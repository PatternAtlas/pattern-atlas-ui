import { PAComment } from "../../model/comment";

export class Candidate {
    comments: PAComment[];
    content: string;
    iconUrl: any;
    id: string;
    name: string;
    patternLanguageId: string;
    patternLanguageName: string;
    rating: number = 0;
    uri: string;
    version: string = '0.1.0';
  
    constructor()
    constructor(_content: string, _name: string, _patternLanguageId: string)
    constructor(_content?: string, _name?: string, _patternLanguageId?: string) {
      this.content = _content;
      this.name = _name;
      this.patternLanguageId = _patternLanguageId;
    }
  }