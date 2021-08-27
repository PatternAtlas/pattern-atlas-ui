export class DiscussionComment {
  id: string;
  text: string;
  date: Date;
  replyTo: string;
  discussionTopicId: string;

  constructor(text: string, replyTo: string, discussionTopicId: string) {
    this.text = text;
    this.date = new Date();
    this.replyTo = replyTo;
    this.discussionTopicId = discussionTopicId;
  }
}

