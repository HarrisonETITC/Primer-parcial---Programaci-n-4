import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/Services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.css']
})
export class RepuestosComponent implements OnInit {
  columnas: string[];
  source: MatTableDataSource<any> = new MatTableDataSource();
  data: any;

  mostrarTabla: boolean = true;

  formularioRepuestos = new FormGroup({
    valor: new FormControl('',[Validators.required]),
    tipo: new FormControl('',[Validators.required]),
    vehiculo: new FormControl('',[Validators.required])
  });

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.getRepuestos();
  }

  async getRepuestos(): Promise<void> {
    (await this.api.getAll("Repuestos")).subscribe((res) => {
      this.data = res;
      this.loadTable();
    })
  }

  loadTable(): void {
    this.columnas = Object.keys(this.data[0]);
    this.source.data = this.data;
  }

  mostrarAlert(): void {
    if(this.formularioRepuestos.valid) {
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
    if(this.formularioRepuestos.controls[formControl].hasError("required")) {
      return "Este campo es requerido";
    }
    if(this.formularioRepuestos.controls[formControl].hasError("maxlength")) {
      let valor = this.formularioRepuestos.controls[formControl].errors.maxlength.requiredLength;
      return "Máximo de "+valor+" carácteres";
    }
    if(this.formularioRepuestos.controls[formControl].hasError("minlength")) {
      let valor = this.formularioRepuestos.controls[formControl].errors.minlength.requiredLength;
      return "Máximo de "+valor+" carácteres";
    }
    return "";
  }
}
