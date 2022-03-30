import { Component } from '@angular/core';
import * as XLSX from "xlsx";
import { SendDataService } from './service/send-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subsidio-upload';
  convertedJson!: string;
  datos!: Datacsv[] ;
  showMonto: boolean = false;
  showCodigo: boolean = false;
  errorMonto!: String;
  errorCodigo!: String;
  montosInvalidos: Number[] = []
  codigosInvalidos: Number[] = []
  buttonProcesar: boolean = true
  uploadfile: Datacsv[] = [];

  constructor(private _serviceData: SendDataService){}


  fileUpload(event:any){
    this.showMonto = false
    this.showCodigo = false

    //console.log(event.target.files);
    const selectedFile = event.target.files[0];
    //aca extraigo el nombre del archivo
    const nameFile = selectedFile.name;

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      //console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});

      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])

        this.convertedJson = JSON.stringify(data, undefined, 4);
        this.datos = data as Datacsv[];

        //console.log(this.convertedJson);
       // console.log(this.datos);
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          //console.log((element as {codigo: string; monto: string }).monto)

         if ((element as {monto: number }).monto < 5 || (element as {monto: number }).monto > 500) {
           this.showMonto = true
           this.errorMonto = "Archivo contiene Montos Invalidos";
           this.montosInvalidos.push((element as {monto: number }).monto)
         }
        }

        //aca extraigo los codigo del JSON
      const codEmp: Number[] = [];
      this.datos.forEach(element => {
          codEmp.push(element.codigo)

        });
        console.log(codEmp);

        //Aca le paso el codigo extraido anteriormente al JSON inicial para sacar los duplicados
       const duplicados = this.datos.filter((value, index) => codEmp.indexOf(value.codigo) !== index)
       //console.log(duplicados.map(e => e.codigo) );
       if (duplicados.length > 0) {
        this.showCodigo = true;
        this.errorCodigo = 'Archivo contiene Codigos de Empleado Duplicados';
        this.codigosInvalidos = duplicados.map(e => e.codigo)
       }

      })
      //console.log(workbook)
    }

  }

  sendData(){
    return this._serviceData.sendData(this.datos)
    .subscribe( (resp) => {
      console.log(resp);
    } )
  }

}

export interface Datacsv {
  codigo: Number,
  monto: Number,
  nombreArchivo: String,
  userUpload: String
}
