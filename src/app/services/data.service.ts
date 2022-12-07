import { Injectable } from '@angular/core';
import { Json } from '../interfaces/json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //https://www.youtube.com/watch?v=df0eH9mM9nU&ab_channel=FernandoHerrera
  arrCoordenadas:Json[] = [];
  multiline:string;
  constructor() { }
}
