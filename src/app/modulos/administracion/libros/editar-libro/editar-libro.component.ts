import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloLibro } from 'src/app/modelos/libro.modelo';
import { LibroService } from 'src/app/servicios/libro.service';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.css']
})
export class EditarLibroComponent implements OnInit {
id:string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'titulo': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'autor': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioLibro: LibroService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarLibro();
  }

  BuscarLibro(){
    this.servicioLibro.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloLibro) => {
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["titulo"].setValue(datos.titulo);
      this.fgValidador.controls["precio"].setValue(datos.precio);
      this.fgValidador.controls["autor"].setValue(datos.autor);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
    });
  }

  EditarLibro() {
    let titulo = this.fgValidador.controls["titulo"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let autor = this.fgValidador.controls["autor"].value;
    let imagen = this.fgValidador.controls["imagen"].value;
    let l = new ModeloLibro();
    l.titulo = titulo;
    l.precio = precio;
    l.autor = autor;
    l.imagen = imagen;
    l.id = this.id;
    this.servicioLibro.ActualizarLibro(l).subscribe((datos: ModeloLibro) => {
      alert("Libro actualizado correctamente");
      this.router.navigate(["/administracion/listar-libros"]);
    }, (error: any) => {
      alert("Error actualizando el libro");
    })
  }

}