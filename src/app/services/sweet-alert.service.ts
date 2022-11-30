import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alertSuccess(mensaje:string) {
    swal.fire({
      title: mensaje,
      text: '',
      icon: 'success'
    });
  }

  alertError=async(mensaje:string)=>{
    swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      text: mensaje,
      
    });
  }


  alertWarning(mensaje:string) {
    swal.fire({
      title: mensaje,
      text: '',
      icon: 'info'
    });
  }

}
