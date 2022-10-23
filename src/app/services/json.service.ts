import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Json } from '../interfaces/json';


@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private global:GlobalService,private http:HttpClient) { }

  // getClientes(){
  //   var token = this.auth.obtenerToken()
    
  //   const headers = new HttpHeaders({
  //         token:token
  //   });

  //   return this.http.get<Cliente>(this.global.url+'/clientes/datos',{headers});
  // }

  validarJsonSchema(json:Json){
    return new Promise( resolve => {
      this.http.post(this.global.url+'/validarJsonSchema',json).subscribe( async resp => {
        if( resp=='OK' ) {
          resolve(true);
        }else{
          resolve(false); 
        }
      }
      );  
    })
  }

}
