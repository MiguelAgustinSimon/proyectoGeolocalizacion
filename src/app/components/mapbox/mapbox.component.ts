import { Component, OnInit, Input} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { DataService } from 'src/app/services/data.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Json } from 'src/app/interfaces/json';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

   mapa:Mapboxgl.Map;
   latitudInicial=0;
   longitudInicial=0;
   //@Input() dataEntrante:any;
  constructor(public dataService:DataService,private router: Router) {
   
    if(this.dataService.arrCoordenadas.length === 0){
      //si no cargo nada que vaya al home
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    //console.log(this.dataService.arrCoordenadas);
    this.latitudInicial=this.obtenerPromedioLatitud(this.dataService.arrCoordenadas);
    this.longitudInicial=this.obtenerPromedioLongitud(this.dataService.arrCoordenadas);

    this.mapa = new Mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'mapa', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.longitudInicial,this.latitudInicial], // starting position [lng, lat]
      zoom: 5, // starting zoom
    });

    this.dataService.arrCoordenadas.forEach(val=> {
      this.crearMarcador(val.longitud,val.latitud);
    });

    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.mapa.addControl(new Mapboxgl.FullscreenControl());
  }

  crearMarcador(lng:number, lat:number){

    // Create a default Marker and add it to the map.
    const marker = new Mapboxgl.Marker({
      draggable:true
    })
    .setLngLat([lng,lat])
    .addTo(this.mapa);

    marker.on('drag',()=>{
      console.log(marker.getLngLat());
    })
    
  }

  obtenerPromedioLatitud=(arrJson:Json[]):number=>{
    let acumuladorLat=0;

    for(let pos in arrJson){
      acumuladorLat+=arrJson[pos]["latitud"];
    }
    return (acumuladorLat/arrJson.length);
  }
  obtenerPromedioLongitud=(arrJson:Json[]):number=>{
    let acumuladorLng=0;

    for(let pos in arrJson){
      acumuladorLng+=arrJson[pos]["longitud"];
    }
    return (acumuladorLng/arrJson.length);
  }

}
