import { MaestrosUtl } from '../../maestros-i';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaestrosapiService } from '../maestrosapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-eliminar-maestro',
  templateUrl: './eliminar.html',
})
export class Eliminar implements OnInit {
  formulario!: FormGroup;
  idmaestro: number | string = '';
  
  regMaestro: MaestrosUtl = {
    idmaestro: 0,
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    public maestrosUtl: MaestrosapiService,
    public fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario reactivo con los campos deshabilitados para solo lectura
    this.formulario = this.fb.group({
      idmaestro: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      apaterno: [{ value: '', disabled: true }],
      amaterno: [{ value: '', disabled: true }],
      correo: [{ value: '', disabled: true }]
    });

    // Capturamos el parámetro 'idmaestro' enviado por la ruta
    this.idmaestro = this.route.snapshot.paramMap.get('idmaestro') || '';

    if (this.idmaestro) {
      // Consultamos los datos del maestro a Flask inmediatamente al cargar el componente
      this.maestrosUtl.getMaestro(this.idmaestro).subscribe({
        next: (response) => {
          // Validamos si Flask devolvió el objeto maestro correctamente
          const maestroData = response.maestro || response; 
          if (maestroData) {
            this.regMaestro = maestroData;
            this.formulario.patchValue(maestroData);
          }
        },
        error: (error) => {
          console.error('Error al consultar el maestro:', error);
          alert('No se pudieron cargar los datos del maestro para eliminar');
        }
      });
    }
  }

  // Método para confirmar y ejecutar la eliminación en la BD a través de Flask
  eliminarConfirmado(): void {
    this.maestrosUtl.eliminarMaestro(this.idmaestro).subscribe({
      next: (response) => {
        console.log('Maestro eliminado:', response);
        alert('Maestro eliminado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        const mensaje = error.error?.mensaje || error.error?.error || 'Ocurrió un error al eliminar el maestro';
        alert(mensaje);
      }
    });
  }
}