import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {
  columnas: string[];
  source: MatTableDataSource<any> = new MatTableDataSource();
  data: any;

  mostrarTabla: boolean = true;

  formularioVehiculos = new FormGroup({
    marca: new FormControl('',[Validators.required]),
    color: new FormControl('',[Validators.required]),
    modelo: new FormControl('',[Validators.required]),
    placa: new FormControl('',[Validators.required,Validators.maxLength(6)])
  });

  constructor(public api:ApiService) { }
  
  ngOnInit(): void {
    this.getVehiculos();
  }

  async getVehiculos(): Promise<void> {
    (await this.api.getAll("Vehiculos")).subscribe((res) => {
      this.data = res;
      this.loadTable();
    })
  }

  loadTable(): void {
    this.columnas = Object.keys(this.data[0]);
    this.source.data = this.data;
  }

  mostrarAlert(): void {
    if(this.formularioVehiculos.valid) {
      Swal.fire('Correcto','Vehículo ingresado correctamente', 'success');
    } else {
      Swal.fire('Error','Revise los datos y vuelva a intentar', 'error');
    }
  }

  cambiarTablaFormulario(estado?:boolean){ 
    if(estado != undefined) {
      this.mostrarTabla = estado;
    } else {
      if(this.mostrarTabla) {
        this.mostrarTabla = false;
      } else {
        this.mostrarTabla = true;
      }
    }
  }

  getErrorMessage(formControl: string): string {
    if(this.formularioVehiculos.controls[formControl].hasError("required")) {
      return "Este campo es requerido";
    }
    if(this.formularioVehiculos.controls[formControl].hasError("maxlength")) {
      let valor = this.formularioVehiculos.controls[formControl].errors.maxlength.requiredLength;
      return "Máximo de "+valor+" carácteres";
    }
    if(this.formularioVehiculos.controls[formControl].hasError("minlength")) {
      let valor = this.formularioVehiculos.controls[formControl].errors.minlength.requiredLength;
      return "Máximo de "+valor+" carácteres";
    }
    return "";
  }
}
