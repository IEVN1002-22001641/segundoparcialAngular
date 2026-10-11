import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../alumno';
import { materialize } from 'rxjs';

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos implements OnInit {
  formulario!: FormGroup;
  alumnos: Alumno[] = [];
  indiceEdicion: number = -1;

  nuevoAlumno: Alumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };

  ngOnInit(): void {
    this.cargarAlumnos();
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }

  agregarAlumno(): void {
    if (
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.alumnos[this.indiceEdicion] = {
        ...this.nuevoAlumno,
      };
    } else {
      this.alumnos.push({ ...this.nuevoAlumno });
    }

    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));

    this.limpiarCampos();
  }

  muestraAlumnos(): void {
    // Nota: Aquí se asignan los valores del formulario al objeto nuevoAlumno
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
    this.agregarAlumno();
  }

  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }

  editarAlumnos(index: number): void {
    this.nuevoAlumno = {
      ...this.alumnos[index],
    };
    const alumno = this.alumnos[index];
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia,
    });

    this.indiceEdicion = index;
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(this.alumnos));
  }

  limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: '',
    };
    this.indiceEdicion = -1;
  }
}