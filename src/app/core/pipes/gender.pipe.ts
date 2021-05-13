import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    switch(value) {
      case 0:
        return '男';
      case 1:
        return '女';
      default:
        return '保密';
    }
  }

}
