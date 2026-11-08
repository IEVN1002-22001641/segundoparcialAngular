import { AlumnosUtl } from '../alumnosI';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../alumnos/proyectoapi.service';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-editar',
  templateUrl: './editar.html',
})
export class Editar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';
 
  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}
 
  ngOnInit(): void {
    this.formulario = this.fb.group({
      matricula: [''],
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      correo: ['']
    });
 
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
 
    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: (response) => {
        if (response.alumno) {
          this.formulario.patchValue(response.alumno);
        }
      },
      error: (error) => {
        console.error('Error al consultar el alumno:', error);
      }
    });
  }
 
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
 
    const alumno: AlumnosUtl = this.formulario.getRawValue();
 
    // USAMOS EL MÉTODO CORRECTO QUE YA EXISTE EN TU SERVICIO: actualizarAlumno
    this.alumnosUtl.actualizarAlumno(this.matricula, alumno).subscribe({
      next: (response) => {
        if (response) {
          alert('Alumno actualizado correctamente');
          this.router.navigate(['/utl/alumnos']);
        } else {
          alert('No se pudo actualizar el alumno');
        }
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        const mensaje = error.error?.mensaje || error.error?.error || 'Ocurrió un error al actualizar el alumno';
        alert(mensaje);
      }
    });
  }
}