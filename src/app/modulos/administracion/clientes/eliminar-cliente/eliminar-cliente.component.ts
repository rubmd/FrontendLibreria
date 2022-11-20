import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {

  id:string = '';
  nombres: string = '';
  apellidos: string = '';
  correo: string = '';
  celular: string = '';

  constructor(private fb: FormBuilder,
    private servicioCliente: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.BuscarCliente();
  }

  BuscarCliente(){
    this.id = this.route.snapshot.params["id"];
    this.servicioCliente.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloCliente) => {
      if (datos.nombres && datos.apellidos && datos.correo && datos.celular){
        this.nombres = datos.nombres;
        this.apellidos = datos.apellidos;
        this.correo = datos.correo;
        this.celular = datos.celular;
      }
    });
  }

  EliminarCliente() {
    this.servicioCliente.EliminarCliente(this.id).subscribe((datos: any) => {
      alert("Cliente eliminado correctamente");
      this.router.navigate(["/administracion/listar-clientes"]);
    }, (error: any) => {
      alert("Error eliminando el cliente");
    })
  }

}
