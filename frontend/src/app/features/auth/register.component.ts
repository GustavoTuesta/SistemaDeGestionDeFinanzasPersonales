import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 class="mt-4 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Crear una cuenta
        </h2>
        <p class="mt-1.5 text-center text-sm text-slate-500 dark:text-slate-400">
          Comenzá a organizar tus finanzas personales hoy mismo
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div class="bg-white dark:bg-slate-900 py-8 px-6 shadow-sm border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:px-10 transition-colors">
          
          @if (errorMessage()) {
            <div class="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
                <input
                  id="name"
                  type="text"
                  formControlName="name"
                  placeholder="Juan"
                  class="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3.5 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
                />
                @if (form.get('name')?.touched && form.get('name')?.invalid) {
                  <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">Requerido</p>
                }
              </div>

              <div>
                <label for="lastname" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Apellido</label>
                <input
                  id="lastname"
                  type="text"
                  formControlName="lastname"
                  placeholder="Pérez"
                  class="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3.5 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
                />
                @if (form.get('lastname')?.touched && form.get('lastname')?.invalid) {
                  <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">Requerido</p>
                }
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="juan@ejemplo.com"
                class="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3.5 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
              />
              @if (form.get('email')?.touched && form.get('email')?.invalid) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">Ingresá un correo válido</p>
              }
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Contraseña (mínimo 8 caracteres)
              </label>
              <input
                id="password"
                type="password"
                formControlName="password"
                placeholder="••••••••"
                class="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3.5 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
              />
              @if (form.get('password')?.touched && form.get('password')?.invalid) {
                <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">Debe tener al menos 8 caracteres.</p>
              }
            </div>

            <div class="pt-2">
              <button
                type="submit"
                [disabled]="form.invalid || isLoading()"
                class="w-full flex justify-center py-2.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                @if (isLoading()) {
                  <span>Registrando...</span>
                } @else {
                  <span>Crear Cuenta</span>
                }
              </button>
            </div>
          </form>

          <div class="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            ¿Ya tenés cuenta?
            <a routerLink="/login" class="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 ml-1">
              Iniciá sesión acá
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const raw = this.form.getRawValue();
    const data = {
      name: raw.name!,
      lastname: raw.lastname!,
      email: raw.email!,
      password: raw.password!,
    };

    this.authService.register(data).subscribe({
      next: () => {
        // Iniciar sesión automáticamente
        this.authService.login({ email: data.email, password: data.password }).subscribe({
          next: () => {
            this.isLoading.set(false);
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.isLoading.set(false);
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Error al registrar usuario. Comprobá los datos.'
        );
      },
    });
  }
}
