import { AlumnosUtl } from '../alumnosI';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../alumnos/proyectoapi.service';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-eliminar',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  formulario!: FormGroup;
  matricula: string = '';
  
  regAlumno: AlumnosUtl = {
    matricula: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };
 
  constructor(
    private route: ActivatedRoute,
    public alumnosUtl: ProyectoapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}
 
  ngOnInit(): void {
    // Inicializamos el formulario reactivo
    this.formulario = this.fb.group({
      matricula: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      apaterno: [{ value: '', disabled: true }],
      amaterno: [{ value: '', disabled: true }],
      correo: [{ value: '', disabled: true }]
    });
 
    // Capturamos el parámetro 'matricula' enviado por la ruta
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
 
    if (this.matricula) {
      // Consultamos los datos del alumno a Flask inmediatamente al cargar el componente
      this.alumnosUtl.getAlumno(this.matricula).subscribe({
        next: (response) => {
          // Validamos si Flask devolvió el objeto alumno correctamente
          const alumnoData = response.alumno || response; 
          if (alumnoData) {
            this.regAlumno = alumnoData;
            this.formulario.patchValue(alumnoData);
          }
        },
        error: (error) => {
          console.error('Error al consultar el alumno:', error);
          alert('No se pudieron cargar los datos del alumno para eliminar');
        }
      });
    }
  }

  // Método para confirmar y ejecutar la eliminación en la BD a través de Flask
  eliminarConfirmado(): void {
    this.alumnosUtl.eliminarAlumno(this.matricula).subscribe({
      next: (response) => {
        console.log('Alumno eliminado:', response);
        alert('Alumno eliminado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        const mensaje = error.error?.mensaje || error.error?.error || 'Ocurrió un error al eliminar el alumno';
        alert(mensaje);
      }
    });
  }
}