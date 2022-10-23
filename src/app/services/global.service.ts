import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  url:string = 'http://localhost:3000/api';
  //url:string = 'https://sistema.globalnet.net.ar/api';
  constructor() { }
}