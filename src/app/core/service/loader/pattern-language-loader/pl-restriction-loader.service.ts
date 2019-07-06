import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../../pattern-ontology.service';
import Loader from '../../../model/loader';
import { PatternLanguageSectionRestriction } from '../../../model/PatternLanguageSectionRestriction.model';
import { RestrictionResponse } from '../../data/RestrictionResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PlRestrictionLoaderService extends Loader<any> {

  constructor(private pos: PatternOntologyService) {
    super(null, pos);
  }

  selectContentFromStore(): Promise<any> {
    return this.pos.getRestrictionsOfPL(this.supportedIRI);
  }

  mapTriples(triples: any): Promise<Map<string, PatternLanguageSectionRestriction[]>> {
    const map = new Map<string, PatternLanguageSectionRestriction[]>();
    for (const restriction of triples) {
      const property = restriction.property.value.split('#has')[1];
      if (!map.get(property)) {
        map.set(property, []);
      }
      const restrictionsArray = map.get(property) ? map.get(property) : [];
      restrictionsArray.push(this.mapRestrictionResponseToJSObject(restriction));
      map.set(property, restrictionsArray);
    }

    return Promise.resolve(map);
  }

  mapRestrictionResponseToJSObject(restriction: RestrictionResponse): PatternLanguageSectionRestriction {
    const sectionRestriction = new PatternLanguageSectionRestriction(restriction.property.value, null,
      null, null);
    if (restriction.allValuesdataRange) {
      sectionRestriction.restrictionType = 'only';
      sectionRestriction.type = restriction.allValuesdataRange.value;
    } else if (restriction.someValuesdataRange) {
      sectionRestriction.restrictionType = 'some';
      sectionRestriction.type = restriction.someValuesdataRange.value;
    } else {
      sectionRestriction.type = restriction.dataRange.value;
      if (restriction.exactCardinality) {
        sectionRestriction.restrictionType = 'exact';
        sectionRestriction.cardinality = +restriction.exactCardinality.value;
      } else if (restriction.minCardinality) {
        sectionRestriction.restrictionType = 'min';
        sectionRestriction.cardinality = +restriction.minCardinality.value;
      } else if (restriction.maxCardinality) {
        sectionRestriction.restrictionType = 'max';
        sectionRestriction.cardinality = +restriction.maxCardinality.value;
      }
    }

    return sectionRestriction;
  }
}
