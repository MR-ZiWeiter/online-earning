import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keysValues = [];
    Object.keys(value).map(key => {
      keysValues.push({
        label: key,
        value: value[key]
      })
    })
    return keysValues;
  }

}
