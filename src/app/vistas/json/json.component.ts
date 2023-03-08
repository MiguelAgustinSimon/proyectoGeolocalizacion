import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { JsonService } from '../../services/json.service';
import {Router} from '@angular/router';
import {Json} from '../../interfaces/json';
import { DataService } from 'src/app/services/data.service';
import { Lugarinfo } from 'src/app/interfaces/lugarinfo';

//va a servir para rutas: https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/
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
  archivoValidando:boolean=false;
  arrJsonCoords:Json[] = [];

  coords:Json={
    id:0,
    latitud:0,
    longitud:0
  };
  
  unlugar:Lugarinfo={
    id:0,
    anio:0,
    tipo:"",
    latitud:0,
    longitud:0,
    provincia:"",
    localidad:"",
    tramo:""
  }

  constructor(private router: Router, public JsonService:JsonService, 
    public sweetAlertServ:SweetAlertService, private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.multiline=null;
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
      this.myFile=myReader.result; //te muestra todo el json en texto plano
       
      let miJson=JSON.parse(<string>myReader.result); //parseo el json a un objeto TS
      this.setearLatLong(this.myFile,miJson);//le paso el archivoPlano y el objetoTS
    }
    myReader.readAsText(file);
  }

  setearLatLong=async(archivoPlano:any, miJson:any)=>{
    for(let pos in miJson){
      if(pos=="geometry"){
        if(miJson.geometry.type=='Point' || miJson.geometry.type=='MultiPoint'){
          for(let position in miJson.geometry.coordinates){
            //lleno mi array al recorrer el Json
            this.coords=miJson.geometry.coordinates[position];
            this.coords.latitud=miJson.geometry.coordinates[position][0];
            this.coords.longitud=miJson.geometry.coordinates[position][1];
            this.arrJsonCoords.push(this.coords);
          }
        }
        //console.log(this.arrJsonCoords);
      }

      if(pos=="features"){
            for(let position in miJson.features){
              if(miJson.features[position].geometry.type=='Point' || miJson.features[position].geometry.type=='MultiPoint'){
                this.coords=miJson.features[position].geometry.coordinates;
              
                //pregunto por si geometry.coordinates tiene doble array: ejemplo "coordinates":[[-58.35325384158226,-34.65116216792222]]
                if(miJson.features[position].geometry.coordinates[1]==undefined){
                  this.coords.latitud=miJson.features[position].geometry.coordinates[0][1];
                  this.coords.longitud=miJson.features[position].geometry.coordinates[0][0];
                }else{
                  this.coords.latitud=miJson.features[position].geometry.coordinates[1];
                  this.coords.longitud=miJson.features[position].geometry.coordinates[0];
                }

                //Aca voy a llenar la info de cada punto para al hacer click mostrar en mapa
                if(miJson.features[position].properties!=null){
                  this.unlugar=miJson.features[position].properties;
                  this.coords.infoLugar=this.unlugar;
                }
                this.arrJsonCoords.push(this.coords);
              }else{
                console.log(`ES!!! ${miJson.features[position].geometry.type}`);
                this.dataService.tipo=miJson.features[position].geometry.type;
                this.dataService.multiline=archivoPlano;
              }
            } //fin for
          
       
      }
    }
  }

  async validarJsonSchema(){
    this.archivoValidando=true;
    var valido = await this.JsonService.validarJsonSchema(this.nombreArchivo,this.myFile);
    if(valido){
      this.sweetAlertServ.alertSuccess('Json Válido!');
      if(this.dataService.multiline==null) //son todos tipo Point, mostrara en mapa los markers
      {
        //le paso a dataService los datos para que lo consuma MAPBOX..
        this.dataService.arrCoordenadas=this.arrJsonCoords;
        this.renderizarMapa();
      }else{
        if(this.dataService.tipo=='LineString' || this.dataService.tipo=='MultiLineString')
        {
          //son multiline, mostrara en mapa muchas lineas(como rutas), no markers
          this.renderizarMapaMultiline();
        }
        else{
          //son poligonos
          this.renderizarMapaPolygon();
        }
       
      }
      
    }else{
      this.archivoValidando=false;
      this.archivoCargado=false;
    }
}

renderizarMapa(){
  this.router.navigate(['/mapbox']);
}

renderizarMapaMultiline(){
  this.router.navigate(['/mapboxmultiline']);
}
renderizarMapaPolygon(){
  this.router.navigate(['/mapboxpolygon']);
}

  
}
