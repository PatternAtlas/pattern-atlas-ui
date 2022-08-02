import { RatingModelRequest } from '..';

export class RatingEventModel {
  rating: RatingModelRequest;
  entity: any;

  constructor(_rating: RatingModelRequest, _entity: any) {
    this.rating = _rating;
    this.entity = _entity;
  }
}
