import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  id:string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'rol': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioCliente: ClienteService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarCliente();
  }

  BuscarCliente(){
    this.servicioCliente.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloCliente) => {
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["celular"].setValue(datos.celular);;
      this.fgValidador.controls["rol"].setValue(datos.rol);
    });
  }

  EditarCliente() {
    let nombres = this.fgValidador.controls["nombres"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let celular = this.fgValidador.controls["celular"].value;
    let rol = this.fgValidador.controls["rol"].value;
    let c = new ModeloCliente();
    c.nombres = nombres;
    c.apellidos = apellidos;
    c.correo = correo;
    c.celular = celular;
    c.rol = rol;
    c.id = this.id;
    this.servicioCliente.ActualizarCliente(c).subscribe((datos: ModeloCliente) => {
      alert("Cliente actualizado correctamente");
      this.router.navigate(["/administracion/listar-clientes"]);
    }, (error: any) => {
      alert("Error actualizando el cliente");
    })
  }

}