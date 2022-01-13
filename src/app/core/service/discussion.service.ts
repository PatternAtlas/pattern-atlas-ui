import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiscussionTopic } from '../model/discussion-topic';
import { DiscussionComment } from '../model/discussion-comment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

  private repoEndpoint = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  addTopic(discussionTopic: DiscussionTopic): Observable<any> {
    const url = this.repoEndpoint + '/add-topic';
    return this.http.post<DiscussionTopic>(url, discussionTopic, { observe: 'response' });
  }

  deleteTopicById(id: string) {
    const url = this.repoEndpoint + '/delete-topic/' + id;
    return this.http.delete<DiscussionTopic>(url, { observe: 'response' });
  }

  addComment(discussionComment: DiscussionComment, topicId: string): Observable<any> {
    const url = this.repoEndpoint + '/add-comment/' + topicId;
    return this.http.post<DiscussionTopic>(url, discussionComment, { observe: 'response' });
  }
}
