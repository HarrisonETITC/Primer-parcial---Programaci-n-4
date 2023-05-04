import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogin = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    contra: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private rutero: Router, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  mostrarAlert(): void {
    if (this.formularioLogin.valid) {
      let correo = this.formularioLogin.controls.correo.value;
      let contra = this.formularioLogin.controls.contra.value;

      if (correo == "Harrison" && contra == "asd123456") {
        Swal.fire('Exito', 'Ha ingresado correctamente', 'success');
        localStorage.setItem("logueado", "si");
        this.rutero.navigate(['/Vehiculos']);
        this.loginService.enviarDatos('logeado');
      } else {
        Swal.fire('Advertencia', 'Los datos no son correctos', 'warning');
      }

    } else {
      Swal.fire('Error', 'Revise los datos y vuelva a intentar', 'error');
    }
  }

  getErrorMessage(formControl: string): string {
    if (this.formularioLogin.controls[formControl].hasError("required")) {
      return "Este campo es requerido";
    }
    if (this.formularioLogin.controls[formControl].hasError("maxlength")) {
      let valor = this.formularioLogin.controls[formControl].errors.maxlength.requiredLength;
      return "Máximo de " + valor + " carácteres";
    }
    if (this.formularioLogin.controls[formControl].hasError("minlength")) {
      let valor = this.formularioLogin.controls[formControl].errors.minlength.requiredLength;
      return "Mínimo de " + valor + " carácteres";
    }
    return "";
  }

}
