import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaestrosapiService } from './maestrosapi.service';
import { MaestroFilterPipe } from './maestros-filter.pipe';
import { CommonModule } from '@angular/common';
import { MaestrosUtl } from '../maestros-i';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [FormsModule, RouterLink, MaestroFilterPipe, CommonModule],
  templateUrl: './maestros.html',
})
export class Maestros implements OnInit {
  imagewidth: number = 50;
  imageMargin: number = 2;
  muestraImg: boolean = true;
  listFilter: string = '';
  maestroTitle: string = 'Lista de Maestros UTL';
  maestrosIric: MaestrosUtl[] = [];

  constructor(
    public maestrosUtlService: MaestrosapiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.maestrosUtlService.getMaestros().subscribe({
      next: (response: any) => {
        this.maestrosIric = response.maestros;
        console.log('Maestros cargados con éxito desde la BD:', response);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consultar los maestros:', err);
      },
    });
  }

  showImage(): void {
    this.muestraImg = !this.muestraImg;
  }

  eliminarMaestro(idmaestro: number | string): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al maestro con ID ${idmaestro}?`)) {
      this.maestrosUtlService.eliminarMaestro(idmaestro).subscribe({
        next: (res) => {
          console.log('Maestro eliminado:', res);
          this.cargarMaestros();
        },
        error: (err) => {
          console.error('Error al eliminar el maestro:', err);
        }
      });
    }
  }
}