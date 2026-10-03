import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})


export class Zodiaco {
  
  nombre: string = '';
  aPaterno: string = '';
  aMaterno: string = '';
  dia: number = 0;
  mes: number = 0;
  anio: number = 0;
  sexo: string = '';
  nombreCompleto: string = '';
  edad: number = 0;
  signo: string = '';
  imagenSigno: string = '';

  imprimir() {
    this.nombreCompleto = this.nombre + ' ' + this.aPaterno + ' ' + this.aMaterno;
   
    this.edad = 2026 - this.anio;
    
    switch (this.anio % 12) {
      case 0:
        this.signo = 'Mono';
        this.imagenSigno = 'img/mono.png';
        break;
      case 1:
        this.signo = 'Gallo';
        this.imagenSigno = 'img/gallo.png';
        break;
      case 2:
        this.signo = 'Perro';
        this.imagenSigno = 'img/perro.png';
        break;
      case 3:
        this.signo = 'Cerdo';
        this.imagenSigno = 'img/cerdo.png';
        break;
      case 4:
        this.signo = 'Rata';
        this.imagenSigno = 'img/rata.png';
        break;
      case 5:
        this.signo = 'Buey';
        this.imagenSigno = 'img/buey.png';
        break;
      case 6:
        this.signo = 'Tigre';
        this.imagenSigno = 'img/tigre.png';
        break;
      case 7:
        this.signo = 'Conejo';
        this.imagenSigno = 'img/conejo.png';
        break;
      case 8:
        this.signo = 'Dragón';
        this.imagenSigno = 'img/dragon.png';
        break;
      case 9:
        this.signo = 'Serpiente';
        this.imagenSigno = 'img/serpiente.png';
        break;
      case 10:
        this.signo = 'Caballo';
        this.imagenSigno = 'img/caballo.png';
        break;
      case 11:
        this.signo = 'Cabra';
        this.imagenSigno = 'img/cabra.png';
        break;
    }
    
  }
}
