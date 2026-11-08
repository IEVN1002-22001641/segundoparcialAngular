import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUtl } from '../maestros-i';

@Pipe({
  name: 'maestroFilter',
  standalone: true,
})
export class MaestroFilterPipe implements PipeTransform {
  transform(value: MaestrosUtl[], args: string): MaestrosUtl[] {
    let filter: string = args ? args.toLocaleLowerCase() : '';
    return filter
      ? value.filter((maestro: MaestrosUtl) =>
          maestro.nombre.toLocaleLowerCase().includes(filter)
        )
      : value;
  }
}