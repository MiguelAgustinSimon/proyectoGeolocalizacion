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

  alertError(mensaje:string) {
    swal.fire({
      title: mensaje,
      text: '',
      icon: 'error'
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
