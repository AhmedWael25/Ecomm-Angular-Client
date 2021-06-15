import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string,length:number): string {

    return (value.length>length)?value.substr(0,length)+"..":value;
  }

}
