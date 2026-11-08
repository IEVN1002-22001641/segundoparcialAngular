import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProyectoapiService } from './proyectoapi.service';
import { AlumnoFilterPipe } from './alumnos-filter.pipe';
import { CommonModule } from '@angular/common';
import { AlumnosUtl } from '../alumnosI';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})

export class Alumnos implements OnInit {
  imagewidth: number = 50;
  imageMargin: number = 2;
  muestraImg: boolean = true;
  listFilter: string = '';
  alumnoTitle: string = 'Lista de Alumnos UTL';
  alumnosIric: AlumnosUtl[] = [];

  // Inyectamos ChangeDetectorRef en el constructor
  constructor(
    public alumnosUtl: ProyectoapiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response: any) => {
        this.alumnosIric = response.alumnos;
        console.log('Registros cargados con éxito desde la BD:', response);

        // Forzamos a Angular a actualizar la vista de inmediato con los datos recibidos
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar los alumnos:', err);
      },
    });
  }

  showImage(): void {
    this.muestraImg = !this.muestraImg;
  }

  eliminarAlumno(matricula: string | number): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al alumno con matrícula ${matricula}?`)) {
      this.alumnosUtl.eliminarAlumno(matricula).subscribe({
        next: (res) => {
          console.log('Alumno eliminado:', res);
          // Recargamos la lista para reflejar los cambios en la tabla
          this.cargarAlumnos();
        },
        error: (err) => {
          console.error('Error al eliminar el alumno:', err);
        }
      });
    }
  }

}

/*@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule, RouterLink, AlumnoFilterPipe, CommonModule],
  templateUrl: './alumnos.html',
})

export class Alumnos implements OnInit {
  imagewidth: number = 50;
  imageMargin: number = 2;
  muestraImg: boolean = true;
  listFilter: string = '';
  alumnoTitle: string = 'Lista de Alumnos UTL';

  alumnosIric: AlumnosUtl[] = [
    {
      matricula: 1234,
      nombre: 'pedro',
      apaterno: 'lopez',
      amaterno: 'muñoz',
      correo: 'pedro@gmail.com',
    },
  ];

  dataSource: any[] = [];
  constructor(public alumnosUtl: ProyectoapiService) {}

  ngOnInit(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response: any) => {
        this.alumnosIric = response.alumnos;
        console.log(response);
      },
      error: (err) => {
        console.error('Error al consultar los alumnos', err);
      },
    });
  }

  showImage(): void {
    this.muestraImg = !this.muestraImg;
  }
}
*/
