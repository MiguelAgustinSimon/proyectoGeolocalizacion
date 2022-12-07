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
//https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/

@Component({
  selector: 'app-mapboxmultiline',
  templateUrl: './mapboxmultiline.component.html',
  styleUrls: ['./mapboxmultiline.component.css']
})
export class MapboxmultilineComponent implements OnInit {

  mapa:Mapboxgl.Map;
  test:string;
  theCoords:any;
 constructor(public dataService:DataService,private router: Router) {
  this.dataService.multiline=`"type":"FeatureCollection","totalFeatures":272,"features":[{"type":"Feature","id":"_3.4.1.1.6.rutas_nacionales_dnv18.view.fid--1a90d579_181f375fb7d_-262d",
  "geometry":{"type":"MultiLineString",
  "coordinates":[[[-58.52493,-34.783997]]]},
  "geometry_name":"geometry"}]`;
  //console.log(dataService.multiline);
   
  this.test=`{"type": "Feature",
  "properties": {},
  "geometry": {
  "type": "LineString",
  "coordinates": [
    [-122.483696, 37.833818],
    [-122.483482, 37.833174],
    [-122.483396, 37.8327],
    [-122.483568, 37.832056],
    [-122.48404, 37.831141],
    [-122.48404, 37.830497],
    [-122.483482, 37.82992],
    [-122.483568, 37.829548],
    [-122.48507, 37.829446],
    [-122.4861, 37.828802],
    [-122.486958, 37.82931],
    [-122.487001, 37.830802],
    [-122.487516, 37.831683],
    [-122.488031, 37.832158],
    [-122.488889, 37.832971],
    [-122.489876, 37.832632],
    [-122.490434, 37.832937],
    [-122.49125, 37.832429],
    [-122.491636, 37.832564],
    [-122.492237, 37.833378],
    [-122.493782, 37.833683]
  ]
  }}`;
 }

 ngOnInit() {
  this.mapa = new Mapboxgl.Map({
    accessToken: environment.mapboxKey,
    container: 'mapa', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-122.483696, 37.833818], // starting position [lng, lat]
    zoom: 5, // starting zoom
  });
   this.mapa.on('load', () => {
    this.mapa.addSource('route', {
    'type': 'geojson',
    "data": JSON.parse(this.test)
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
    'line-width': 8
    }
    });
    });
     
   
 }



}
