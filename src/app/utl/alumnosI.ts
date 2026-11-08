export interface AlumnosUtl {
  matricula: string; // Cambiado a string para empatar con el VARCHAR de MySQL / Flask
  nombre: string;
  apaterno: string;
  amaterno: string;
  correo: string;
}