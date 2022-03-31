import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { DataFile } from "../data-file";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  urlSend = environment.urlSend;
  urlProcesar = environment.urlProcesar

  constructor( private httpClient: HttpClient ) { }

  sendData(file: DataFile[]){
    return this.httpClient.post(this.urlSend, file, {responseType: 'json'})
  }

  procesar(){
    //return this.httpClient.post(this.urlSend, file, {responseType: 'text'})
    return "procesando......."
  }

}
