import { PatternRelation } from '.';
import UriEntity from '../../core/model/hal/uri-entity.model';

export class Pattern extends UriEntity {

  relations?: Array<PatternRelation>;
  // whether this patterns has any relations to patterns from other languages
  hasClrs?: boolean;
}
