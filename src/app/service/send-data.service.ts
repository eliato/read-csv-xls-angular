import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { DataFile } from "../data-file";

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  urlSend = 'http://10.217.1.188:8383/sath/api/subsidio/registrar-datos';
  urlProcesar = 'http://10.217.1.188:8383/sath/api/subsidio';

  constructor( private httpClient: HttpClient ) { }

  sendData(file: DataFile[]){
    return this.httpClient.post(this.urlSend, file, {responseType: 'text'})
  }

  procesar(){
    //return this.httpClient.post(this.urlSend, file, {responseType: 'text'})
    return "procesando......."
  }

}
