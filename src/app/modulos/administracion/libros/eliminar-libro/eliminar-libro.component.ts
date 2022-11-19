import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloLibro } from 'src/app/modelos/libro.modelo';
import { LibroService } from 'src/app/servicios/libro.service';

@Component({
  selector: 'app-eliminar-libro',
  templateUrl: './eliminar-libro.component.html',
  styleUrls: ['./eliminar-libro.component.css']
})
export class EliminarLibroComponent implements OnInit {

  id:string = '';
  titulo: string = '';
  autor: string = '';
  imagen: string = '';

  constructor(private fb: FormBuilder,
    private servicioLibro: LibroService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.BuscarLibro();
  }

  BuscarLibro(){
    this.id = this.route.snapshot.params["id"];
    this.servicioLibro.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloLibro) => {
      if (datos.autor && datos.titulo && datos.imagen){
        this.titulo = datos.titulo;
        this.autor = datos.autor;
        this.imagen = datos.imagen;
      }
    });
  }

  EliminarLibro() {
    this.servicioLibro.EliminarLibro(this.id).subscribe((datos: any) => {
      alert("Libro eliminado correctamente");
      this.router.navigate(["/administracion/listar-libros"]);
    }, (error: any) => {
      alert("Error eliminando el libro");
    })
  }

}
