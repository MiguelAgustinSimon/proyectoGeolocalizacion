import { Categoria } from './categoria';

export interface Bitacora {
    _id?:string;
    nombreArchivo?:string;
    categorias?:Categoria[];
    modelo?:string;
    nombre?:string;
    estado?:boolean;
    createdAt?:Date;
    observacion?:string;
}
