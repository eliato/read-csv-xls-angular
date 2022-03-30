import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { SendDataService } from '../../service/send-data.service';
import { DataFile } from "../../data-file";
import swal from 'sweetalert2';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  title = 'subsidio-upload';
  convertedJson!: string;
  datos!: DataFile[] ;
  showMonto: boolean = false;
  showCodigo: boolean = false;
  errorMonto!: String;
  errorCodigo!: String;
  montosInvalidos: Number[] = [];
  codigosInvalidos: Number[] = [];
  buttonProcesar: boolean = true;
  uploadfile: DataFile[] = [];
  nameFile!: String;
  nCodigos!: any;
  nMontos!: any;
  constructor(private _serviceData: SendDataService) { }

  fileUpload(event:any){
    this.showMonto = false;
    this.showCodigo = false;

    //console.log(event.target.files);
    const selectedFile = event.target.files[0];
    //aca extraigo el nombre del archivo
    this.nameFile = selectedFile.name;

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      //console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});

      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])

        this.convertedJson = JSON.stringify(data, undefined, 4);
        this.datos = data as DataFile[];
        this.nCodigos = this.datos.length
        //console.log(this.convertedJson);
       // console.log(this.datos);
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          //console.log((element as {codigo: string; monto: string }).monto)
         if ((element as {monto: number }).monto < 5 || (element as {monto: number }).monto > 500) {
           this.showMonto = true
           this.errorMonto = "Archivo contiene Montos Invalidos";
           this.montosInvalidos.push((element as {monto: number }).monto);
           this.nameFile = ''
         }
        }

        //aca armo el JSON que se va a enviar al servicio
      const codEmp: Number[] = [];
      this.datos.forEach(element  => {
          codEmp.push(element.codigo)
          var temp = {codigo: element.codigo, monto: element.monto, nombreArchivo: this.nameFile, usuario: "admin" }
          this.uploadfile.push(temp)
        });



        //aca formateo en json el array anterior para mandarlo al servicio.
        JSON.stringify(this.uploadfile, undefined, 4);

        //Aca le paso el codigo extraido anteriormente al JSON inicial para sacar los duplicados
       const duplicados = this.datos.filter((value, index) => codEmp.indexOf(value.codigo) !== index)
       //console.log(duplicados.map(e => e.codigo) );
       if (duplicados.length > 0) {
        this.showCodigo = true;
        this.errorCodigo = 'Archivo contiene Codigos de Empleado Duplicados';
        this.codigosInvalidos = duplicados.map(e => e.codigo)
        this.nameFile = ''
       }

      })
      //console.log(workbook)
    }

  }

  sendData(){
    if (this.uploadfile.length === 0 ) {
      swal.fire('Debes Agregar un Archivo')
    }else if (this.codigosInvalidos.length > 0 || this.montosInvalidos.length > 0) {
      swal.fire('Se deben Corregir Errores en el Archivo')
    }else {
    this._serviceData.sendData(this.uploadfile)
    .subscribe( (resp) => {
      console.log(resp);
      if (resp == 'EXITO') {
        swal.fire('Archivo Registrado con Exito')
        this.nameFile = ''
      }
    } )
    }


  }


  ngOnInit(): void {
  }

}
