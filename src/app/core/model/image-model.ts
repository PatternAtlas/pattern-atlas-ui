import { DiscussionTopicModel } from './discussion-topic-model';

export class ImageModel {
  constructor(image: string, topicModels: DiscussionTopicModel[], id: string) {
    this.image = image;
    this.topicModels = topicModels;
    this.imageId = id;
  }

  image: string;
  topicModels: DiscussionTopicModel[];
  imageId: string;

}
