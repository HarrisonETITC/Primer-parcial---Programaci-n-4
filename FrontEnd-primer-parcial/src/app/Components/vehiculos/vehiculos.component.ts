import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  constructor(public api:ApiService) { }
  
  ngOnInit(): void {
    var response=this.api.getAll("Vehiculos")
    console.log(response);
  }
}
