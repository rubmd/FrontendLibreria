import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloLibro } from '../modelos/libro.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  url = 'http://localhost:3000';
  token: String = '';
  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerRegistros(): Observable<ModeloLibro[]> {
    return this.http.get<ModeloLibro[]>(`${this.url}/libros`);
  }

  ObtenerRegistroPorId(id: string): Observable<ModeloLibro> {
    return this.http.get<ModeloLibro>(`${this.url}/libros/${id}`);
  }

  CrearLibro(libro: ModeloLibro): Observable<ModeloLibro> {
    return this.http.post<ModeloLibro>(`${this.url}/libros`, libro, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarLibro(libro: ModeloLibro): Observable<ModeloLibro> {
    return this.http.put<ModeloLibro>(`${this.url}/libros/${libro.id}`, libro, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarLibro(id: string): Observable<any> {
    return this.http.delete(`${this.url}/libros/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

}