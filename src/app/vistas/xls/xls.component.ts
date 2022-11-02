import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { JsonService } from '../../services/json.service';
import {Router} from '@angular/router';
import {Json} from '../../interfaces/json';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-xls',
  templateUrl: './xls.component.html',
  styleUrls: ['./xls.component.css']
})
export class XlsComponent implements OnInit {

  private fileTmp:any;
  private myFile:any;
  valorArchivo:string="";
  archivoCargado:boolean=false;
  archivoValidado:boolean=true;

  constructor(public JsonService:JsonService, public sweetAlertServ:SweetAlertService) { }

  ngOnInit(): void {
  }

  getFile($event:any):void{
    //https://www.youtube.com/watch?v=diJE8esd_V4&ab_channel=LeiferMendez
    const [file]=$event.target.files;
    this.fileTmp={
      fileRaw:file,
      fileName:file.name
    }
    this.comprueba_extension(file);
    
  }


  comprueba_extension(archivo:any) {
    var allowedExtensions = /(.json|.geojson)$/i;
    if (!archivo) {
       //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario
        this.valorArchivo="No has seleccionado ningún archivo";
        this.archivoValidado=false;
    }else{
       //recupero la extensión de este nombre de archivo
       var archivoRuta=archivo.name;
       var extension=archivoRuta.split('.').pop();

       if(!allowedExtensions.exec(archivoRuta)){
        this.valorArchivo="Debes seleccionar un archivo JSON / GEOJSON";
        this.archivoValidado=false;
       }else{
        this.archivoCargado=true;
        this.readThis(archivo);
       }
    }
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      //console.log(myReader.result);
      //https://www.youtube.com/watch?v=9Pc8LGN4uug&ab_channel=productioncoder
    }
    myReader.readAsText(file);
    this.myFile=file;
  }

  async validarJsonSchema(){
    var valido = await this.JsonService.validarJsonSchema(this.myFile);
    if(valido){
      this.sweetAlertServ.alertSuccess('Json Válido!');
    }
}


}
