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


  validarJsonSchema=async(nombreArchivo:string,json:Json)=>{
    let body =JSON.parse(JSON.stringify(json));
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return await new Promise( resolve => {
        this.http.post(`${this.global.url}/validarJsonSchema/${nombreArchivo}`, body, {headers})
         .subscribe({
          next:resp=>{
            console.log(`RESPUESTA: ${resp}`);
            if( resp ) {
              resolve(true);
            }else{
              resolve(false); 
            }
          },
          error:error=>{
            var errorObtenido=error.error[0].message;
            this.sweetAlertService.alertError(errorObtenido);
            resolve(false);
          }
         }) 
      });
  }

}
