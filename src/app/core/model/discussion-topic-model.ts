import { DiscussionTopic } from './discussion-topic';
import { DiscussionComment } from './discussion-comment';

export interface DiscussionTopicModel {
  discussionTopic: DiscussionTopic;
  discussionComments: DiscussionComment[];
}
