import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'start',
})

export class FilterPipephim implements PipeTransform {

  transform(value: any[], term: string): any[] {
    if(term){
      return value.filter((x:any) => x.TenPhim.toString().toLowerCase().startsWith(term.toString().toLowerCase()) || 
      x.MaPhim.toString().toLowerCase().startsWith(term.toString().toLowerCase()) )
    }
    return value;
  } 
}