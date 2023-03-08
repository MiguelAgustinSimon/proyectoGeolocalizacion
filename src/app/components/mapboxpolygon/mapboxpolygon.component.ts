import { Component, OnInit, Input} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import {Popup,Marker} from 'mapbox-gl';
import { DataService } from 'src/app/services/data.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Json } from 'src/app/interfaces/json';
import { Router } from '@angular/router';
import { JsonComponent } from 'src/app/vistas/json/json.component';
//https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/


@Component({
  selector: 'app-mapboxpolygon',
  templateUrl: './mapboxpolygon.component.html',
  styleUrls: ['./mapboxpolygon.component.css']
})
export class MapboxpolygonComponent implements OnInit {

  
  mapa:Mapboxgl.Map;
  test:string;
  theCoords:any;
 constructor(public dataService:DataService,private router: Router) {
//    this.dataService.multiline=`{
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {
//         "renabap_id": 1,
//         "nombre_barrio": "Monterrey I",
//         "provincia": "Buenos Aires",
//         "departamento": "Pilar",
//         "localidad": "Presidente Derqui",
//         "cantidad_familias_aproximada": 44,
//         "cantidad_viviendas_aproximadas": 40,
//         "decada_de_creacion": "Década 1990",
//         "anio_de_creacion": null,
//         "energia_electrica": "Conexión a la red con medidor comunitario",
//         "efluentes_cloacales": "Desagüe a cámara séptica y pozo ciego",
//         "agua_corriente": "Bomba de agua de pozo domiciliaria",
//         "cocina": "Gas en garrafa",
//         "calefaccion": "Otro / vacío",
//         "situacion_dominial": "Otro tipo de seguridad en la tenencia",
//         "clasificacion_barrio": "Asentamiento",
//         "superficie_m2": 11674
//       },
//       "geometry": {
//         "type": "MultiPolygon",
//         "coordinates": [
//           [
//             [
//               [
//                 -58.83350090114561,
//                 -34.48127677071819
//               ],
//               [
//                 -58.833833644307404,
//                 -34.48086714201079
//               ],
//               [
//                 -58.833401356862986,
//                 -34.480611075635764
//               ],
//               [
//                 -58.833454949299295,
//                 -34.48053482588479
//               ],
//               [
//                 -58.83316876541295,
//                 -34.480371485832094
//               ],
//               [
//                 -58.83281265527377,
//                 -34.48089623257505
//               ],
//               [
//                 -58.83274861043167,
//                 -34.480953113597025
//               ],
//               [
//                 -58.832684987746745,
//                 -34.48096553845355
//               ],
//               [
//                 -58.83202600039955,
//                 -34.481794999739414
//               ],
//               [
//                 -58.83282799961245,
//                 -34.48221100003759
//               ],
//               [
//                 -58.83311200011865,
//                 -34.48185499980838
//               ],
//               [
//                 -58.832599999890036,
//                 -34.48157400033979
//               ],
//               [
//                 -58.832962000395966,
//                 -34.48111900004177
//               ],
//               [
//                 -58.83343836609225,
//                 -34.481346620220094
//               ],
//               [
//                 -58.83350090114561,
//                 -34.48127677071819
//               ]
//             ]
//           ]
//         ]
//       }
//     }
//   ]
// }`;

  console.log(dataService.multiline);

 }

 ngOnInit() {
  this.mapa = new Mapboxgl.Map({
    accessToken: environment.mapboxKey,
    container: 'mapa', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: [-58.83350090114561, -34.48127677071819], // starting position
    zoom: 9, // starting zoom
  });
  
  this.mapa.on('load', () => {
    this.mapa.addSource('maine', {
    'type': 'geojson',
    'data': JSON.parse(this.dataService.multiline)
    });
      // Add a new layer to visualize the polygon.
      this.mapa.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5
        }
        });
        // Add a black outline around the polygon.
        this.mapa.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
        'line-color': '#000',
        'line-width': 3
        }
        });
    // const popup = new Mapboxgl.Popup({ closeOnClick: false })
    // .setLngLat([-96, 37.8])
    // .setHTML('<h1>Hello World!</h1>')
    // .addTo(this.mapa);


    });
   
 }



}
