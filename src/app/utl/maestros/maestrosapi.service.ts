import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaestrosUtl } from '../maestros-i';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaestrosapiService {
  private apiURL = 'http://127.0.0.1:5000/api/maestros';

  constructor(private http: HttpClient) {}

  // Método GET para obtener todos los maestros
  public getMaestros(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`);
  }

  // Método GET para obtener un maestro por ID
  public getMaestro(idmaestro: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${idmaestro}`);
  }

  // Método POST para registrar un maestro
  public agregarMaestro(maestro: MaestrosUtl): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/`, maestro);
  }

  // Método PUT para actualizar un maestro
  public actualizarMaestro(idmaestro: number | string, maestro: MaestrosUtl): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${idmaestro}`, maestro);
  }

  // Método DELETE para eliminar un maestro
  public eliminarMaestro(idmaestro: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${idmaestro}`);
  }
}