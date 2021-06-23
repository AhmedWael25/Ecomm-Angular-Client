import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanTarget'
})
export class BooleanTargetPipe implements PipeTransform {

  transform(value: boolean): unknown {
    
    return (value == true ? 'Yes' : 'No');
  }

}
