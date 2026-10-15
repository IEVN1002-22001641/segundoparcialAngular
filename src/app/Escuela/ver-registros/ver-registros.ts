import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Icinepolis } from '../icinepolis';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-registros',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './ver-registros.html',
  styleUrl: './ver-registros.css',
})
export class VerRegistros implements OnInit {
  cinepolis: Icinepolis[] = [];
  
  mostrarModal: boolean = false;
  indiceEdicion: number = -1;
  mensajeError: string = ''; 
  registroEditando: Icinepolis = {
    nombre: '',
    cc: 0,
    cineco: false,
    cb: 0
  };

  ngOnInit(): void {
    this.cargarCompradores();
  }

  cargarCompradores(): void {
    const datos = localStorage.getItem('cinepolis');
    if (datos) {
      this.cinepolis = JSON.parse(datos);
    }
  }

  eliminarComprador(index: number): void {
    this.cinepolis.splice(index, 1);
    localStorage.setItem('cinepolis', JSON.stringify(this.cinepolis));
  }

  editarCompradores(index: number): void {
    this.indiceEdicion = index;
    this.mensajeError = ''; // Limpiar errores previos al abrir
    this.registroEditando = { ...this.cinepolis[index] };
    this.mostrarModal = true;
  }

  guardarEdicion(): void {
    this.mensajeError = '';
    const { nombre, cc, cineco, cb } = this.registroEditando;

    if (nombre === '' || cc <= 0 || cb <= 0) {
      alert('Todos los campos obligatorios deben llenarse');
      return;
    }


    if (cb <= cc * 7) {
      if (this.indiceEdicion !== -1) {
        this.cinepolis[this.indiceEdicion] = { ...this.registroEditando };
        localStorage.setItem('cinepolis', JSON.stringify(this.cinepolis));
        this.cerrarModal();
      }
    } else {
      this.mensajeError = "Solo se pueden 7 boletos máximo por persona";
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.indiceEdicion = -1;
    this.mensajeError = '';
    this.registroEditando = {
      nombre: '',
      cc: 0,
      cineco: false,
      cb: 0
    };
  }
}