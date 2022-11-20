import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/interfaces/bitacora';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import {Router} from '@angular/router';
import { BitacoraService } from 'src/app/services/bitacora.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  bitacora: Bitacora[];
  buscador:string;


  constructor(private router:Router,private bitacoraService:BitacoraService,public sweetAlertServ:SweetAlertService) { }

  ngOnInit(): void {
    this.traerBitacora();

  }

  traerBitacora(){
    this.bitacoraService.getBitacora().subscribe( resp => {
      this.bitacora=resp;
      console.log(this.bitacora);
      this.buscador = '';
    })
  }

  redirigirBitacoraEspecifica(id:string){
    console.log('ok', id)
    //this.router.navigate(['/perfilcliente',id]);
  }


}
