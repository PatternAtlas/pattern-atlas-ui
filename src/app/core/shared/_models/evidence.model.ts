export class PAEvidence {
  id: string;
  title: string;
  context: string;
  type: string;
  supporting: boolean;
  source: string;
  rating: number;
  upVotes: string[];
  downVotes: string[];
  userId: string;
  userName: string;

  constructor(_userId: string) {
    this.userId = _userId;
  }
}
