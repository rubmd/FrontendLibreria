import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloLibro } from 'src/app/modelos/libro.modelo';
import { LibroService } from 'src/app/servicios/libro.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'titulo': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'autor': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioLibro: LibroService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarLibro() {
    let titulo = this.fgValidador.controls["titulo"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let autor = this.fgValidador.controls["autor"].value;
    let imagen = this.fgValidador.controls["imagen"].value;
    let l = new ModeloLibro();
    l.titulo = titulo;
    l.precio = precio;
    l.autor = autor;
    l.imagen = imagen;
    this.servicioLibro.CrearLibro(l).subscribe((datos: ModeloLibro) => {
      alert("Libro almacenado correctamente");
      this.router.navigate(["/administracion/listar-libros"]);
    }, (error: any) => {
      alert("Error almacenando el libro");
    })
  }

}