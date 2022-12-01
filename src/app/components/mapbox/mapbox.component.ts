import { Component, OnInit, Input} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import {Popup,Marker} from 'mapbox-gl';
import { DataService } from 'src/app/services/data.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Json } from 'src/app/interfaces/json';
import { Router } from '@angular/router';

//Mapas FernandoHerrera: https://www.youtube.com/watch?v=rjzsRvq0URo&list=PLCKuOXG0bPi0RHirEQB7GJgpfW-Q5m-Xu&index=2&ab_channel=FernandoHerrera
@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.css']
})
export class MapboxComponent implements OnInit {

   mapa:Mapboxgl.Map;
   latitudInicial=0;
   longitudInicial=0;

  constructor(public dataService:DataService,private router: Router) {
   
    if(this.dataService.arrCoordenadas.length === 0){
      //si no cargo nada que vaya al home
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    console.log(this.dataService);
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
      this.crearMarcador(val.longitud,val.latitud,val.infoLugar);
    });

    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.mapa.addControl(new Mapboxgl.FullscreenControl());
  }

  crearMarcador(lng:number, lat:number,infoLugar?:any){
    let miTablaHtml="";
    for (var key in infoLugar) {
      // console.log(key);
      // console.log(infoLugar[key]);
      // miTablaHtml+=
      // `<table class="default"> 
      //   <tr>
      //     <th>${key}</th>
      //   </tr>
      //   <tr>
      //     <td>${infoLugar[key]}</td>
      //   </tr>
      // </table>`;
      miTablaHtml+=`<b>${key}: ${infoLugar[key]}</b><br><hr>`;
    }

    // Create a default Marker and add it to the map.
    const marker = new Mapboxgl.Marker({
      draggable:false
    })
    .setLngLat([lng,lat])
    .setPopup(
      new Mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(
           //`<h3>${infoLugar.tramo}</h3><p>${infoLugar.ID_Ruta}</p>`
          miTablaHtml
        )
    )
    .addTo(this.mapa);

    marker.on('drag',()=>{
      console.log(marker.getLngLat());
    })
    // marker.getElement().addEventListener('click', () => {
    //   console.log(marker.getLngLat());
    
    // });
    
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
