export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export interface Ingreso {
  id: number;
  userId: number;
  categoryId: number;
  amount: number | string;
  date: string;
}

export interface CrearIngresoRequest {
  userId: number;
  categoryId: number;
  amount: number;
}

export interface ActualizarIngresoRequest {
  categoryId?: number;
  amount?: number;
}

export interface Gasto {
  id: number;
  userId: number;
  categoryId: number;
  amount: number | string;
  date: string;
}

export interface CrearGastoRequest {
  userId: number;
  categoryId: number;
  amount: number;
}

export interface ActualizarGastoRequest {
  categoryId?: number;
  amount?: number;
}

export interface Prestamo {
  id: number;
  userId: number;
  nombrePrestamo: string;
  amount: number | string;
  date: string;
}

export interface CrearPrestamoRequest {
  userId: number;
  nombrePrestamo: string;
  amount: number;
}

export interface ActualizarPrestamoRequest {
  nombrePrestamo?: string;
  amount?: number;
}

export interface CategoryOption {
  id: number;
  name: string;
}
