import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Json } from '../interfaces/json';
import { SweetAlertService } from './sweet-alert.service';


@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private global:GlobalService,private http:HttpClient,private sweetAlertService:SweetAlertService) { }

  // getClientes(){
  //   var token = this.auth.obtenerToken()
    
  //   const headers = new HttpHeaders({
  //         token:token
  //   });

  //   return this.http.get<Cliente>(this.global.url+'/clientes/datos',{headers});
  // }

  validarJsonSchema(nombreArchivo:string,json:Json){
      return new Promise( resolve => {
        this.http.post(`${this.global.url}/validarJsonSchema/${nombreArchivo}`,json).subscribe( async resp => {
          console.log(`RESPUESTA: ${resp}`);
          if( resp=='OK' ) {
            resolve(true);
          }else{
            resolve(false); 
          }
        }, 
        error => {
          var errorObtenido=error.error[0].message;
          this.sweetAlertService.alertError(errorObtenido);
          resolve(false);
        },
        );  
      })
    
  }



}
