import { RespuestaBase } from "./RespuestaBase";

export interface LoginOut extends RespuestaBase //Se le diice que LoginOut esta heredando los atributos de RespuestaBase
{
    detalle:{
        rol: number,
        correo: string
    }    
}