import { Component, OnInit } from '@angular/core';
import { ModeloLibro } from 'src/app/modelos/libro.modelo';
import { LibroService } from 'src/app/servicios/libro.service';

@Component({
  selector: 'app-buscar-libro',
  templateUrl: './buscar-libro.component.html',
  styleUrls: ['./buscar-libro.component.css']
})
export class BuscarLibroComponent implements OnInit {

listadoRegistros: ModeloLibro[] = [];

  constructor(private libroServicio: LibroService) { }

  ngOnInit(): void {
    this.ObtenerListadoLibros();
  }

  ObtenerListadoLibros(){
    this.libroServicio.ObtenerRegistros().subscribe((datos: ModeloLibro[]) => {
      this.listadoRegistros = datos;
    })
  }

}
