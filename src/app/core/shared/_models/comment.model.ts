export class PAComment {
  id: string;
  text: string;
  rating: number;
  upVotes: string[];
  downVotes: string[];
  userId: string;
  userName: string;

  constructor(_text: string) {
    this.text = _text;
    this.upVotes = [];
    this.downVotes = [];
  }
}
