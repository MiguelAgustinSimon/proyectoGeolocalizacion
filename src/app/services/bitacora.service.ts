import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bitacora } from '../interfaces/bitacora';
import { GlobalService } from './global.service';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  constructor(private global:GlobalService,private http:HttpClient,private sweetAlertService:SweetAlertService) { }


  getBitacora(){
      return this.http.get<Bitacora[]>(this.global.url+'/getBitacora');
  }
  getBitacoraPaginada(page:number){
    console.log("llego");
    return this.http.get<Bitacora[]>(`${this.global.url}/getBitacora?page=${page}`);
}
}
