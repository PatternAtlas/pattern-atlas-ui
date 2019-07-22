import { Injectable } from '@angular/core';
import { PatternOntologyService } from '../../pattern-ontology.service';
import Loader from '../../../model/loader';
import { PatternLanguageSectionRestriction, SectionRestrictionsResult } from '../../../model/PatternLanguageSectionRestriction.model';

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
      const property = restriction.property.value;
      if (!map.get(property)) {
        map.set(property, []);
      }
      const restrictionsArray = map.get(property) ? map.get(property) : [];
      restrictionsArray.push(this.mapRestrictionResponseToJSObject(restriction));
      map.set(property, restrictionsArray);
    }

    return Promise.resolve(map);
  }

  mapRestrictionResponseToJSObject(restriction): PatternLanguageSectionRestriction {
    const sectionRestriction = new PatternLanguageSectionRestriction(restriction.property.value, null,
      null, null);
    if (restriction.allValuesdataRange) {
      sectionRestriction.restrictionType = 'only';
      sectionRestriction.type = restriction.allValuesdataRange.value;
    } else if (restriction.someValuesdataRange) {
      sectionRestriction.restrictionType = 'some';
      sectionRestriction.type = restriction.someValuesdataRange.value;
    }
    if (restriction.dataRange && restriction.dataRange.value) {
        sectionRestriction.type = restriction.dataRange.value;
    }
    if (restriction.exactCardinality) {
      sectionRestriction.restrictionType = 'exactly';
      sectionRestriction.cardinality = +restriction.exactCardinality.value;
    } else if (restriction.minCardinality) {
      sectionRestriction.restrictionType = 'min';
      sectionRestriction.cardinality = +restriction.minCardinality.value;
    } else if (restriction.maxCardinality) {
      sectionRestriction.restrictionType = 'max';
      sectionRestriction.cardinality = +restriction.maxCardinality.value;
    }
    if (!sectionRestriction.type) {
      console.log('missiong type for');
      console.log(restriction);

    }


    return sectionRestriction;
  }

  // sum up all the restrictions in the array in one restriction object
  getRestrictionsForSection(section: string, restrictions: PatternLanguageSectionRestriction[]): SectionRestrictionsResult {
    const restrictionWithTypeIndex = restrictions.findIndex((rest: PatternLanguageSectionRestriction) => {
      return !!rest.type;
    });

    if (restrictionWithTypeIndex === -1 || !restrictions[restrictionWithTypeIndex]) {
      console.log('no restrictions for ' + section);
      return null;
    }
    const sectionType = restrictionWithTypeIndex !== -1 ? restrictions[restrictionWithTypeIndex].type : '';
    const exactlyRestrictionIndex = restrictions.findIndex((rest: PatternLanguageSectionRestriction) => {
      return rest.restrictionType === 'exactly';
    });
    if (exactlyRestrictionIndex !== -1) {
      return <SectionRestrictionsResult>{
        type: sectionType, maxCardinality: restrictions[exactlyRestrictionIndex].cardinality,
        minCardinality: restrictions[exactlyRestrictionIndex].cardinality
      };
    }

    const minRestrictionIndex = restrictions.findIndex((rest: PatternLanguageSectionRestriction) => {
      return rest.restrictionType === 'min';
    });
    let minCardinality = 0;
    if (minRestrictionIndex !== -1) {
      minCardinality = restrictions[minRestrictionIndex].cardinality;
    } else if (restrictions[restrictionWithTypeIndex].restrictionType === 'some') {
      minCardinality = 1;
    }
    const maxRestrictionIndex = restrictions.findIndex((rest: PatternLanguageSectionRestriction) => {
      return rest.restrictionType === 'max';
    });

    return {
      type: sectionType,
      minCardinality: minCardinality,
      maxCardinality: maxRestrictionIndex !== -1 ? restrictions[maxRestrictionIndex].cardinality : null
    };

  }


}
