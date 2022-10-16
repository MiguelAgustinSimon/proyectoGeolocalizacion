import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  archivoCargado:boolean=false;

  validar(){
    alert("valida");
  }
   
  subirArchivo(){
    alert("subirArchivo");
    this.archivoCargado=true;
  }
  

}
