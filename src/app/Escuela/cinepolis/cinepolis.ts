import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Icinepolis } from '../icinepolis';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cinepolis',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis implements OnInit {
  formulario!: FormGroup;
  cinepolis: Icinepolis[] = [];

  boleto : number = 12;
  totalPagar : number = 0;
  descuento : number = 0;
  descCineco : number = 0;
  totalSD : number = 0;
  mensajeError : string = '';
  indiceEdicion: number = -1;

  nuevoCinepolis: Icinepolis = {
    nombre: '',
    cc: 0,
    cineco: false,
    cb: 0
  };

  ngOnInit(): void {
    this.cargarCompradores();
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cc: new FormControl(0),
      cineco: new FormControl(false),
      cb: new FormControl(0)
    });
  }

  cargarCompradores(): void {
    const datos = localStorage.getItem('cinepolis');
    if (datos) {
      this.cinepolis = JSON.parse(datos);
    }
  }

  preocesoPago():void{
    this.mensajeError = '';
    const { nombre, cc, cineco, cb } = this.formulario.value;
    
    
    if (cb <= cc * 7) {      
      if(cb > 5){
        this.descuento = 0.15;
      }else if (cb >= 3 && cb <= 5){
        this.descuento = 0.10;
      }else{
        this.descuento = 0;
      }

      this.totalSD = this.boleto * cb; 
      this.totalPagar = this.totalSD - (this.totalSD * this.descuento);
      
      this.nuevoCinepolis.nombre = this.formulario.value.nombre;
      this.nuevoCinepolis.cc = this.formulario.value.cc;
      this.nuevoCinepolis.cineco = this.formulario.value.cineco;
      this.nuevoCinepolis.cb = this.formulario.value.cb;

      if(cineco === true){
        this.totalPagar = this.totalPagar - (this.totalPagar * 0.10);
      }
      
      this.agregarComprador();
    } else {
      this.mensajeError = "Solo se pueden 7 boletos máximo por persona";
    }
  }

  agregarComprador(): void {
    if (
      this.nuevoCinepolis.nombre === '' ||
      this.nuevoCinepolis.cc === 0 ||
      this.nuevoCinepolis.cb === 0
    ) {
      alert('Todos los campos obligatorios deben llenarse');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.cinepolis[this.indiceEdicion] = {
        ...this.nuevoCinepolis,
      };
    } else {
      this.cinepolis.push({ ...this.nuevoCinepolis });
    }

    localStorage.setItem('cinepolis', JSON.stringify(this.cinepolis));

    this.limpiarCampos();
  }

  limpiarCampos(): void {
    this.nuevoCinepolis = {
      nombre: '',
      cc: 0,
      cineco: false,
      cb: 0
    };
    this.formulario.patchValue({
      nombre: this.nuevoCinepolis.nombre,
      cc: this.nuevoCinepolis.cc,
      cineco: this.nuevoCinepolis.cineco,
      cb: this.nuevoCinepolis.cb
    });
    this.indiceEdicion = -1;
  }

  editarComprador(index: number): void {
    this.nuevoCinepolis = {
      ...this.cinepolis[index],
    };
    const comprador = this.cinepolis[index];
    this.formulario.patchValue({
      nombre: comprador.nombre,
      cc: comprador.cc,
      cineco: comprador.cineco,
      cb: comprador.cb,
    });

    this.indiceEdicion = index;
  }
}