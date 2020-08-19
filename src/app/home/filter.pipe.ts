import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'startsWith',
})

export class FilterPipe implements PipeTransform {

  transform(value: any[], term: string): any[] {
    if(term){
      return value.filter((x:any) => x.TenPhim.toString().toLowerCase().startsWith(term.toString().toLowerCase()))
    }
    return value;
  } 
}