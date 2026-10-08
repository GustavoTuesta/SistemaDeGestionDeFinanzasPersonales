import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../models/finance.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = 'http://localhost:5000/api';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  readonly token = signal<string | null>(this.getInitialToken());
  readonly currentUser = signal<User | null>(this.getInitialUser());
  readonly isAuthenticated = computed(() => !!this.token());

  private getInitialToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getInitialUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        this.setToken(res.token);
        // Intentar recuperar datos del usuario o decodificar token
        let email = credentials.email;
        try {
          const payload = JSON.parse(atob(res.token.split('.')[1]));
          if (payload.email) email = payload.email;
        } catch {}

        const existingUser = this.currentUser();
        const user: User = existingUser && existingUser.email === email
          ? existingUser
          : {
              id: existingUser?.id || 1,
              email,
              name: email.split('@')[0],
              lastname: '',
            };
        this.setUser(user);
      })
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, data).pipe(
      tap((res) => {
        if (res.user) {
          this.setUser(res.user);
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.token.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
    this.token.set(token);
  }

  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUser.set(user);
  }

  updateUserId(newId: number): void {
    const user = this.currentUser();
    if (user) {
      this.setUser({ ...user, id: newId });
    }
  }
}
