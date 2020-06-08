export class DiscussionTopic {
  id: string;
  title: string;
  description: string;
  status: string;
  date: Date;
  x: string;
  y: string;
  imageId: string;

  constructor(title: string, description: string, status: string,
              x: string, y: string, imageId: string) {
      this.title = title;
      this.description = description;
      this.status = status;
      this.date = new Date();
      this.x = x;
      this.y = y;
      this.imageId = imageId;
  }
}


