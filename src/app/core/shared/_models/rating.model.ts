export class RatingModel {
    rating: number;
    userId: string;

    constructor(_rating: number, _userId: string) {
      this.rating = _rating;
      this.userId = _userId;
    }
}
