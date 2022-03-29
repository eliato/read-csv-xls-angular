import { Component } from '@angular/core';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'subsidio-upload';
  convertedJson!: String;
  datos: any[] = [];
  show: boolean = false;
  fileUpload(event:any){
    this.show = false
    //console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      //console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        console.log(data);
        //this.convertedJson = JSON.stringify(data, undefined, 4);
        this.datos = data;
        this.datos.pop
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          //console.log((element as {codigo: string; monto: string }).monto) 
         if ((element as {monto: number }).monto < 5) {
           this.show = true
         }
         
         
        }
        
       
        //console.log(this.convertedJson);
      })
      //console.log(workbook)
    }

  }

}
