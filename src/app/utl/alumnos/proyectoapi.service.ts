import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlumnosUtl } from '../alumnosI'; // Asegúrate de que apunte a donde tienes tu interfaz
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProyectoapiService {
  private apiURL = 'http://127.0.0.1:5000/api/alumnos';

  constructor(private http: HttpClient) {}

  // Método GET para obtener todos los alumnos (espera un objeto con la llave 'alumnos')
  public getAlumnos(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`);
  }

  public getAlumno(matricula: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${matricula}`);
  }

  public agregarAlumno(alumno: AlumnosUtl): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/`, alumno);
  }

  public actualizarAlumno(matricula: number | string, alumno: AlumnosUtl): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${matricula}`, alumno);
  }

  public eliminarAlumno(matricula: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${matricula}`);
  }
}