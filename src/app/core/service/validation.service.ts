import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UriConverter } from '../util/uri-converter';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  static getMessageForError(section, keyError, errorValue): string {
    if (keyError === 'required') {
      return section + ': This value is required';
    }
    if (keyError === 'xsdImage') {

      return section + ': Please follow this patterns: ![](http://) and enter a valid url in the round brackets';
    }
    if (keyError === 'xsdInteger') {
      return section + ': Please enter an integer.';
    }

    if (keyError === 'xsdAnyURI') {

      return section + ': Please enter a valid URL/URL.';
    }
    if (keyError === 'minlength') {
      return section + ': Please enter only ' + errorValue['requiredLength'] + ' entries';
    }
    if (keyError === 'maxlength') {
      return section + ': Please enter max. ' + errorValue['requiredLength'] + ' entries';
    }
  }

  // checks if value is an array of strings matching the markdown image patterns (e.g.
  // [![test](http://placekitten.com/200/300), ![](http://any.valid.url.com)]
  static xsdImage(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined) {
        if (!this.allValuesMatchRegex(control.value, /!\[.*\]\(http(s)?:\/\/([a-zA-Z.0-9]+[\/]*)+\)/g)) {
          return { xsdImage: true };
        }
      }
      return null;
    };
  }

  // checks if value is an array of strings matching the markdown image patterns (e.g.
  // [![test](http://placekitten.com/200/300), ![](http://any.valid.url.com)]
  static xsdInteger(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined) {
        let arrayOfImageValues = control.value;
        if (!(arrayOfImageValues instanceof Array)) {
          arrayOfImageValues = [arrayOfImageValues];
        }
        for (const item of arrayOfImageValues) {
          if (isNaN(+item)) {
            return { xsdInteger: true };
          }
        }
      }
      return null;
    };
  }

  // checks if value is an array of strings matching the markdown url patterns (e.g.
  // [[test](http://placekitten.com/200/300), [](http://any.valid.url.com)]
  static xsdAnyURI(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined) {
        if (!this.allValuesMatchRegex(control.value, /\[.*\]\(http:\/\/([a-zA-Z.0-9]+[\/]*)+\)/g)) {
          return { xsdAnyURI: true };
        }
      }
      return null;
    };
  }

  static startsWithValidPrefix(allowedPrefixes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined) {
        if (control.value.indexOf(':') === -1) {
          return { startsWithValidPrefix: true };
        }
        const prefix = control.value.trim().substring(0, control.value.indexOf(':'));
        if (allowedPrefixes.findIndex(it => it === prefix) === -1) {
          return { startsWithValidPrefix: true };
        }
      }
      return null;
    };
  }

  private static allValuesMatchRegex(array: any, regex) {
    let arrayOfImageValues = array;
    if (!(arrayOfImageValues instanceof Array)) {
      arrayOfImageValues = [arrayOfImageValues];
    }
    for (const stringItem of arrayOfImageValues) {
      const item = stringItem.startsWith('* ') ? stringItem.substr(2) : stringItem;
      if (!item || UriConverter.removeWhitespace(item).length === 0) {
        continue;
      }
      if (!item.match(regex)) {
        continue;
      }
      const match = item.match(regex);
      if (match.length < item.trim().length) {
        return false;
      }
    }
    return true;
  }
}

