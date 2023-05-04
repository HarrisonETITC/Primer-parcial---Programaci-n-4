import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepuestosComponent } from './Components/repuestos/repuestos.component';
import { VehiculosComponent } from './Components/vehiculos/vehiculos.component';
import { LoginComponent } from './Components/login/login.component';
import { LogueadoGuard } from './Guards/logueado.guard';

const routes: Routes = [
  {path: 'Vehiculos', component: VehiculosComponent, canActivate: [LogueadoGuard]},
  {path: 'Repuestos', component: RepuestosComponent, canActivate: [LogueadoGuard]},
  {path: '', redirectTo: 'Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
