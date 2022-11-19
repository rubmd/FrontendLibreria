import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { BuscarLibroComponent } from './libros/buscar-libro/buscar-libro.component';
import { EditarLibroComponent } from './libros/editar-libro/editar-libro.component';
import { CrearLibroComponent } from './libros/crear-libro/crear-libro.component';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';

const routes: Routes = [
  {
    path: 'crear-cliente',
    component: CrearClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-cliente',
    component: EditarClienteComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: "listar-libros",
    component: BuscarLibroComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-libro',
    component: CrearLibroComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-libro/:id',
    component: EditarLibroComponent,
    canActivate: [ValidadorSesionGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
