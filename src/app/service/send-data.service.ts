import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpErrorResponse  } from '@angular/common/http';
export interface Datacsv {
  codigo: Number,
  monto: Number,
  nombreArchivo: String,
  userUpload: String
}

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  urlServer = 'http://10.217.1.188:8383/sath/api/subsidio/registrar-datos';

  constructor( private httpClient: HttpClient ) { }

  sendData(file: Datacsv[]){
    return this.httpClient.post(this.urlServer, file, {responseType: 'text'})
  }

}
