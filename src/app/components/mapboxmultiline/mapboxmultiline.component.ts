import { Component, OnInit, Input} from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import {Popup,Marker} from 'mapbox-gl';
import { DataService } from 'src/app/services/data.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Json } from 'src/app/interfaces/json';
import { Router } from '@angular/router';
import { JsonComponent } from 'src/app/vistas/json/json.component';
//https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/

@Component({
  selector: 'app-mapboxmultiline',
  templateUrl: './mapboxmultiline.component.html',
  styleUrls: ['./mapboxmultiline.component.css']
})
export class MapboxmultilineComponent implements OnInit {

  mapa:Mapboxgl.Map;
 constructor(public dataService:DataService,private router: Router) {
  console.log(dataService.multiline);
  //  this.dataService.multiline=`{"type":"FeatureCollection","totalFeatures":272,
  //  "features":[{"type":"Feature","id":"_3.4.1.1.6.rutas_nacionales_dnv18.view.fid--1a90d579_181f375fb7d_-262d",
  //  "geometry":{"type":"MultiLineString",
  //  "coordinates":[[[-58.52493,-34.783997],[-58.524222,-34.784057],[-58.523875,-34.784091],[-58.523481,-34.784152],[-58.523154,-34.784253],
  //  [-58.522845,-34.784382],[-58.522605,-34.784511],[-58.522287,-34.784742],[-58.521962,-34.785047],[-58.521692,-34.785302],[-58.521539,-34.785485],
  //  [-58.521164,-34.785989],[-58.519985,-34.787601],[-58.518764,-34.789272],[-58.517838,-34.790669],[-58.517335,-34.791491],[-58.516851,-34.79234],
  //  [-58.515971,-34.794044],[-58.515453,-34.795163],[-58.514779,-34.796885],[-58.514322,-34.798196],[-58.513945,-34.799436],[-58.513563,-34.801074],
  //  [-58.513325,-34.802194],[-58.512365,-34.806747],[-58.511801,-34.809397],[-58.511569,-34.810479],[-58.511317,-34.812014],[-58.511197,-34.812929],
  //  [-58.510971,-34.814191],[-58.510501,-34.816352],[-58.509465,-34.821353],[-58.509145,-34.823152],[-58.508522,-34.827166],[-58.508474,-34.827518],
  //  [-58.508446,-34.827957],[-58.508453,-34.828355],[-58.5085,-34.828925],[-58.508569,-34.829325],[-58.508671,-34.82972],[-58.5088,-34.830096],
  //  [-58.508929,-34.830413],[-58.509154,-34.830858],[-58.509433,-34.831324],[-58.509778,-34.831801],[-58.510261,-34.832339],[-58.510823,-34.832859],
  //  [-58.511257,-34.833198],[-58.511509,-34.833368],[-58.512068,-34.833704],[-58.513025,-34.834191],[-58.517249,-34.836274],[-58.519494,-34.837395],
  //  [-58.519997,-34.837651],[-58.523537,-34.83941],[-58.529133,-34.842193],[-58.535904,-34.845563],[-58.536775,-34.845994],[-58.537733,-34.846511],
  //  [-58.538787,-34.847087],[-58.540077,-34.847806],[-58.542053,-34.84891],[-58.544416,-34.850213],[-58.546529,-34.851383],[-58.547415,-34.851868],
  //  [-58.548615,-34.852483],[-58.551658,-34.853937],[-58.55344,-34.854892],[-58.558321,-34.857382],[-66.388587,-33.327184],[-66.388385,-33.327333],
  //  [-66.388281,-33.327454],[-66.38817,-33.327624],[-66.388124,-33.327669],[-66.388058,-33.327718],[-66.387977,-33.327739]]]},
  //  "geometry_name":"geometry","properties":{"id_ruta":544,"FNA":"RN V146","GNA":"RN","NAM":"V146","RTN":"V146","Sentido":"D","FUN":6,"HCT":1,
  //  "SAG":"DNV","Tipo_Calzada":"P","Progresiva_Final":9.87}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}`;
 
 }

 ngOnInit() {
  this.mapa = new Mapboxgl.Map({
    accessToken: environment.mapboxKey,
    container: 'mapa', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-58.52493,-34.783997], // starting position [lng, lat]
    zoom: 4, // starting zoom
  });
  
   this.mapa.on('load', () => {
    this.mapa.addSource('route', {
    'type': 'geojson',
    'data': JSON.parse(this.dataService.multiline)
    });
    this.mapa.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#888',
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
