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

export const CATEGORIAS_INGRESO: readonly CategoryOption[] = [
  { id: 1, name: 'Sueldo' },
  { id: 2, name: 'Viaticos' },
] as const;

export const CATEGORIAS_GASTO: readonly CategoryOption[] = [
  { id: 1, name: 'Comida' },
  { id: 2, name: 'Transporte' },
  { id: 3, name: 'Salud' },
  { id: 4, name: 'Entretenimiento' },
] as const;

export function obtenerNombreCategoriaIngreso(id: number): string {
  const found = CATEGORIAS_INGRESO.find((c) => c.id === id);
  return found ? found.name : `Categoría #${id}`;
}

export function obtenerNombreCategoriaGasto(id: number): string {
  const found = CATEGORIAS_GASTO.find((c) => c.id === id);
  return found ? found.name : `Categoría #${id}`;
}

