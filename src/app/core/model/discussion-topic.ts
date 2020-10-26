export class DiscussionTopic {
  id: string;
  title: string;
  description: string;
  status: string;
  date: Date;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  imageId: string;

  constructor(title: string, description: string, status: string,
              x: number, y: number, width: number, height: number,
              fill: string, imageId: string) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.date = new Date();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.imageId = imageId;
  }
}


