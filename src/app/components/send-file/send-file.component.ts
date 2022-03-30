import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../../service/send-data.service';
@Component({
  selector: 'app-send-file',
  templateUrl: './send-file.component.html',
  styleUrls: ['./send-file.component.css']
})
export class SendFileComponent implements OnInit {

  constructor(private _serviceData: SendDataService) { }


  procesar(){
    console.log(this._serviceData.procesar());

  }

  ngOnInit(): void {
  }

}
