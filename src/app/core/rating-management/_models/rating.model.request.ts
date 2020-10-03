export class RatingModelRequest {
    rating: number;
    ratingType: RatingType;

    constructor(_rating: number, _ratingType?: RatingType) {
      this.rating = _rating;
      this.ratingType = _ratingType
    }
}

export enum RatingType {
  READABILITY = 'READABILITY',
  UNDERSTANDABILITY = 'UNDERSTANDABILITY',
  APPROPIATENESS = 'APPROPIATENESS'
};
