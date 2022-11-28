import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { JsonService } from '../../services/json.service';
import {Router} from '@angular/router';
import {Json} from '../../interfaces/json';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
//https://www.youtube.com/watch?v=9Pc8LGN4uug&ab_channel=productioncoder
  private myFile:any;
  private nombreArchivo:string;
  valorArchivo:string="";
  archivoCargado:boolean=false;
  archivoValidadoExt:boolean=true;
  arrJsonCoords:Json[] = [];
  coords:Json={
    id:0,
    latitud:0,
    longitud:0
  };

  constructor(private router: Router, public JsonService:JsonService, 
    public sweetAlertServ:SweetAlertService, private dataService:DataService) { }

  ngOnInit(): void {
  }

  getFile($event:any):void{
    //https://www.youtube.com/watch?v=diJE8esd_V4&ab_channel=LeiferMendez
    const [file]=$event.target.files;
    //console.log(file.name);  
    this.nombreArchivo=file.name;
    this.comprueba_extension(file);
    
  }


  comprueba_extension(archivo:any) {
    var allowedExtensions = /(.json|.geojson)$/i;
    if (!archivo) {
       //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario
        this.valorArchivo="No has seleccionado ningún archivo";
        this.archivoValidadoExt=false;
    }else{
       //recupero la extensión de este nombre de archivo
       var archivoRuta=archivo.name;

       if(!allowedExtensions.exec(archivoRuta)){
        this.valorArchivo="Debes seleccionar un archivo JSON / GEOJSON";
        this.archivoValidadoExt=false;
       }else{
        this.archivoCargado=true;
        this.readThis(archivo);
       }
    }
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      //console.log(myReader.result);
       //var lines = (<string>myReader.result).split('\n');
       
      let miJson=JSON.parse(<string>myReader.result); //parseo el json a un objeto TS
    
      for(let pos in miJson){
        if(pos=="geometry"){
          for(let position in miJson.geometry.coordinates){
            //lleno mi array al recorrer el Json
            this.coords=miJson.geometry.coordinates[position];
            this.coords.latitud=miJson.geometry.coordinates[position][0];
            this.coords.longitud=miJson.geometry.coordinates[position][1];
            this.arrJsonCoords.push(this.coords);
          }
          //console.log(this.arrJsonCoords);
        }

        if(pos=="features"){
          for(let position in miJson.features){
            this.coords=miJson.features[position].geometry.coordinates;
            this.coords.latitud=miJson.features[position].geometry.coordinates[0];
            this.coords.longitud=miJson.features[position].geometry.coordinates[1];
            this.arrJsonCoords.push(this.coords);
          }
          //console.log(this.arrJsonCoords);

        }
      }
    
      this.myFile=myReader.result; //te muestra todo el json en texto plano
      
    }
    myReader.readAsText(file);
  }

  async validarJsonSchema(){
    var valido = await this.JsonService.validarJsonSchema(this.nombreArchivo,this.myFile);
    if(valido){
      this.sweetAlertServ.alertSuccess('Json Válido!');

      //le paso a dataService los datos para que lo consuma MAPBOX..
      this.dataService.arrCoordenadas=this.arrJsonCoords;
      this.renderizarMapa();
    }
}

renderizarMapa(){
  this.router.navigate(['/mapbox']);
}

  
}
