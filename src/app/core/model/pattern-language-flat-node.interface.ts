/** Flat node with expandable and level information */
import UriEntity from './hal/uri-entity.model';

export interface PatternLanguageFlatNode extends UriEntity {
    expandable: boolean;
    name: string;
    level: number;
    patternsUrl?: string;
}
