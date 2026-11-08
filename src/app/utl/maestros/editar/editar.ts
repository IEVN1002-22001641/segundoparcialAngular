import { MaestrosUtl } from '../../maestros-i';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaestrosapiService } from '../maestrosapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-editar-maestro',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  idmaestro: number | string = '';

  constructor(
    private route: ActivatedRoute,
    public maestrosUtl: MaestrosapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idmaestro: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });

    // Capturamos el parámetro idmaestro de la URL
    this.idmaestro = this.route.snapshot.paramMap.get('idmaestro') || '';

    this.maestrosUtl.getMaestro(this.idmaestro).subscribe({
      next: (response) => {
        if (response.maestro) {
          this.formulario.patchValue(response.maestro);
        }
      },
      error: (error) => {
        console.error('Error al consultar el maestro:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const maestro: MaestrosUtl = this.formulario.getRawValue();
    
    // Aseguramos que el ID viaje como número entero hacia la API de Flask y la BD
    maestro.idmaestro = Number(maestro.idmaestro);

    this.maestrosUtl.actualizarMaestro(this.idmaestro, maestro).subscribe({
      next: (response) => {
        if (response) {
          alert('Maestro actualizado correctamente');
          this.router.navigate(['/utl/maestros']);
        } else {
          alert('No se pudo actualizar el maestro');
        }
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        const mensaje = error.error?.mensaje || error.error?.error || 'Ocurrió un error al actualizar el maestro';
        alert(mensaje);
      }
    });
  }
}