import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaestrosUtl } from '../../maestros-i'; // Ajusta la ruta a tu interfaz maestrosI.ts
import { Router, RouterLink } from '@angular/router';
import { MaestrosapiService } from '../maestrosapi.service'; // Ajusta la ruta a tu servicio de maestros

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-agregar-maestro',
  templateUrl: './agregar.html',
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  regMaestro: MaestrosUtl = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private fb: FormBuilder,
    public maestrosutl: MaestrosapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('El formulario contiene datos inválidos');
      return;
    }

    const datos: MaestrosUtl = this.formGroup.getRawValue();

    // Aseguramos que idmaestro viaje como número entero por la exigencia de la BD y Flask
    datos.idmaestro = Number(datos.idmaestro);

    console.log('Datos que se enviarán:', datos);

    this.maestrosutl.agregarMaestro(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta de Flask:', respuesta);
        alert('Maestro registrado correctamente');

        this.formGroup.reset();

        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al registrar maestro:', error);

        const mensaje =
          error.error?.mensaje ||
          error.error?.error ||
          error.message ||
          'Ocurrió un error al registrar el maestro';

        alert(mensaje);
      }
    });
  }
}