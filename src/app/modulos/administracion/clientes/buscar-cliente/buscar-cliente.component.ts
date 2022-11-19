import { Component, OnInit } from '@angular/core';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {

  listadoRegistros: ModeloCliente[] = [];

  constructor(private ClienteServicio: ClienteService) { }

  ngOnInit(): void {
    this.ObtenerListadoLibros();
  }

  ObtenerListadoLibros(){
    this.ClienteServicio.ObtenerRegistros().subscribe((datos: ModeloCliente[]) => {
      this.listadoRegistros = datos;
    })
  }

}
