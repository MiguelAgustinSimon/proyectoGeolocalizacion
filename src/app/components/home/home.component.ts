import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private fileTmp:any;
  valorArchivo:string="";
  archivoCargado:boolean=false;
  archivoValidado:boolean=true;

  personajes:any;

  constructor(public restService:RestService) { }



  ngOnInit(): void {
  }

  

  validar(){
    try {
      //let objeto = JSON.parse(textoJSON);
      console.log('Sintaxis Correcta');
    }
    catch (error) {
        if(error instanceof SyntaxError) {
            let mensaje = error.message;
            console.log('ERROR EN LA SINTAXIS:', mensaje);
        } else {
            throw error; // si es otro error, que lo siga lanzando
        }
    }
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

  sendFile(){
    const body=new FormData;
    body.append('myFile',this.fileTmp.fileRaw, this.fileTmp.fileName)
    this.restService.sendPost(body)
    .subscribe(res=>console.log(res))
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
        console.log(archivo);

        // this.restService.getJson(`https://pokeapi.co/api/v2/pokemon/ditto`).subscribe((res:any)=>{
        //   console.log(res);
        // });
       this.readThis(archivo);
       }
    }
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue;
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
      // you can perform an action with readed data here
      console.log(myReader.result);
    }

    myReader.readAsText(file);
  }

}//fin clase
