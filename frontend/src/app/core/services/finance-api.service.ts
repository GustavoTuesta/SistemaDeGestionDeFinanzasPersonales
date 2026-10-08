import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Ingreso,
  CrearIngresoRequest,
  ActualizarIngresoRequest,
  Gasto,
  CrearGastoRequest,
  ActualizarGastoRequest,
  Prestamo,
  CrearPrestamoRequest,
  ActualizarPrestamoRequest,
} from '../models/finance.models';

const API_BASE = 'http://localhost:5000/api';

@Injectable({
  providedIn: 'root',
})
export class IngresosService {
  private http = inject(HttpClient);

  listar(userId: number): Observable<Ingreso[]> {
    return this.http
      .get<{ registros: Ingreso[] }>(`${API_BASE}/ingreso/${userId}`)
      .pipe(map((res) => res.registros || []));
  }

  crear(data: CrearIngresoRequest): Observable<Ingreso> {
    return this.http
      .post<{ registro: Ingreso }>(`${API_BASE}/ingreso`, data)
      .pipe(map((res) => res.registro));
  }

  actualizar(id: number, data: ActualizarIngresoRequest): Observable<Ingreso> {
    return this.http
      .patch<{ registroActualizado: Ingreso }>(`${API_BASE}/ingreso/${id}`, data)
      .pipe(map((res) => res.registroActualizado));
  }

  eliminar(id: number): Observable<Ingreso> {
    return this.http
      .delete<{ registroEliminado: Ingreso }>(`${API_BASE}/ingreso/${id}`)
      .pipe(map((res) => res.registroEliminado));
  }
}

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private http = inject(HttpClient);

  listar(userId: number): Observable<Gasto[]> {
    return this.http
      .get<{ registros: Gasto[] }>(`${API_BASE}/gasto/${userId}`)
      .pipe(map((res) => res.registros || []));
  }

  crear(data: CrearGastoRequest): Observable<Gasto> {
    return this.http
      .post<{ nuevoGasto: Gasto }>(`${API_BASE}/gasto`, data)
      .pipe(map((res) => res.nuevoGasto));
  }

  actualizar(id: number, data: ActualizarGastoRequest): Observable<Gasto> {
    return this.http
      .patch<{ registroActualizado: Gasto }>(`${API_BASE}/gasto/${id}`, data)
      .pipe(map((res) => res.registroActualizado));
  }

  eliminar(id: number): Observable<Gasto> {
    return this.http
      .delete<{ registroEliminado: Gasto }>(`${API_BASE}/gasto/${id}`)
      .pipe(map((res) => res.registroEliminado));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PrestamosService {
  private http = inject(HttpClient);

  listar(userId: number): Observable<Prestamo[]> {
    return this.http
      .get<{ registros: Prestamo[] }>(`${API_BASE}/prestamo/${userId}`)
      .pipe(map((res) => res.registros || []));
  }

  crear(data: CrearPrestamoRequest): Observable<Prestamo> {
    return this.http
      .post<{ registrarPrestamo: Prestamo }>(`${API_BASE}/prestamo`, data)
      .pipe(map((res) => res.registrarPrestamo));
  }

  actualizar(id: number, data: ActualizarPrestamoRequest): Observable<Prestamo> {
    return this.http
      .patch<{ registroActualizado: Prestamo }>(`${API_BASE}/prestamo/${id}`, data)
      .pipe(map((res) => res.registroActualizado));
  }

  eliminar(id: number): Observable<Prestamo> {
    return this.http
      .delete<{ eliminarRegistro: Prestamo }>(`${API_BASE}/prestamo/${id}`)
      .pipe(map((res) => res.eliminarRegistro));
  }
}
