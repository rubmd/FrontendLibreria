import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'correo': ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  RecuperarClave(){
    let correo = this.fgValidador.controls["correo"].value;
    this.servicioSeguridad.RecuperarClave(correo).subscribe((datos:any) => {
      alert("Su Clave ha sido recuperada exitosamente. Tu nueva contraseña llegara al correo electronico registrado");
      this.router.navigate(["/seguridad/identificar"]);
    }, (error: any) => {
      // KO
      alert("Datos Inválidos");
    })  
  }

}