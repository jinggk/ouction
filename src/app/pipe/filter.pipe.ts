import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: string, keyWord: string): any {
    if(!filterField || !keyWord){
      return list;
    }
    return list.filter(item => {
      const fieldValue = item[filterField];
      return fieldValue.indexOf(keyWord) >= 0;
    });
  }

}
