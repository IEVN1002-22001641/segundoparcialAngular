import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alumno } from '../alumno'; // Ajusta la ruta según la ubicación exacta de tu archivo alumno.ts

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos implements OnInit {
  formulario!: FormGroup;
  alumnos: Alumno[] = [];

  nuevoAlumno: Alumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {
    // Se elimina this.cargarAlumno() si no existe el método
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }

  muestraAlumnos(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
  }
}