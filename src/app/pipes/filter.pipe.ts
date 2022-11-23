import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value, args: string) {
    //SI VIENE SIN CONTENIDO HACEMOS RETORNAMOS PARA EVITAR BUSQUEDAS RARAS
    if(!value){
      return;
    }
    //si viene sin argumentos retornamos el array completo
    if(!args){
      return value;
    }

    //Convertimos los argumentos y cada item a minuscula para poder comparar uno con otro
    args = args.toLowerCase();
    return value.filter( (item) => {
      //Retornamos el array completo en donde incluya la palabra de busqueda  
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }


}
