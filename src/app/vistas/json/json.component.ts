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
  private fileTmp:any;
  private myFile:any;
  valorArchivo:string="";
  archivoCargado:boolean=false;
  archivoValidadoExt:boolean=true;
  fileString:any;
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
        this.archivoValidadoExt=false;
    }else{
       //recupero la extensión de este nombre de archivo
       var archivoRuta=archivo.name;
       var extension=archivoRuta.split('.').pop();

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

       for(let pos in miJson.geometry.coordinates){
        //leno un objeto json con el objeto TS y lo paso a un array
        this.coords=miJson.geometry.coordinates[pos];
        this.coords.latitud=miJson.geometry.coordinates[pos][0];
        this.coords.longitud=miJson.geometry.coordinates[pos][1];
        this.arrJsonCoords.push(this.coords);
       }
       this.fileString = myReader.result;

    }
    myReader.readAsText(file);
    this.myFile=file;
 
  }

  async validarJsonSchema(){
    var valido = await this.JsonService.validarJsonSchema(this.myFile);
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
