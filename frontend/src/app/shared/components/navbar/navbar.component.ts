import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-200">
      <div class="w-full px-4 sm:px-6 lg:px-8 2xl:px-10">
        <div class="flex justify-between items-center h-16">
          <!-- Logo & Brand -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span class="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">Finanzas</span>
              <span class="text-xs ml-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">v1.0</span>
            </div>
          </div>

          <!-- User Info, Switcher, Theme & Logout -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            @if (user(); as u) {
              <div class="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-full py-1 px-2.5 sm:px-3">
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center text-xs sm:text-sm">
                  {{ u.name.charAt(0).toUpperCase() }}
                </div>
                <div class="text-left text-xs hidden sm:block">
                  <p class="font-semibold text-slate-800 dark:text-slate-100 leading-tight">{{ u.name }} {{ u.lastname }}</p>
                  <p class="text-slate-500 dark:text-slate-400 leading-tight">ID: {{ u.id }} • {{ u.email }}</p>
                </div>

                <!-- Botón para alternar / cambiar ID de usuario activo -->
                <button
                  type="button"
                  (click)="modalIdAbierto.set(true)"
                  class="ml-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/80 px-2 py-0.5 rounded-full transition-colors"
                  title="Cambiar ID de usuario para pruebas"
                >
                  ID #{{ u.id }} ✏️
                </button>
              </div>
            }

            <!-- Botón Cambiar Tema (Modo Claro / Modo Oscuro) -->
            <button
              type="button"
              (click)="themeService.toggleTheme()"
              class="inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
              [attr.aria-label]="themeService.theme() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
              [attr.title]="themeService.theme() === 'dark' ? 'Modo claro' : 'Modo oscuro'"
            >
              @if (themeService.theme() === 'dark') {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
            </button>

            <button
              type="button"
              (click)="onLogout()"
              class="inline-flex items-center space-x-1.5 min-h-[40px] px-3 py-1.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-900/60 transition-colors focus-visible:ring-2 focus-visible:ring-rose-400"
              aria-label="Cerrar Sesión"
              title="Cerrar Sesión"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Modal para cambiar User ID -->
    @if (modalIdAbierto()) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        <div (click)="modalIdAbierto.set(false)" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl max-w-sm w-full border border-slate-100 dark:border-slate-800">
            <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">Cambiar ID de Usuario Activo</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Podés seleccionar con qué ID de usuario consultar transacciones en el backend.</p>
            
            <div class="mt-4">
              <label class="block text-xs font-medium text-slate-700 dark:text-slate-300">Nuevo User ID</label>
              <input
                type="number"
                min="1"
                [ngModel]="nuevoId()"
                (ngModelChange)="nuevoId.set($event)"
                class="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div class="mt-5 flex justify-end gap-2">
              <button
                type="button"
                (click)="modalIdAbierto.set(false)"
                class="px-3.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="button"
                (click)="aplicarNuevoId()"
                class="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class NavbarComponent {
  private authService = inject(AuthService);
  readonly themeService = inject(ThemeService);
  user = this.authService.currentUser;

  modalIdAbierto = signal(false);
  nuevoId = signal(this.authService.currentUser()?.id || 1);

  onLogout(): void {
    this.authService.logout();
  }

  aplicarNuevoId(): void {
    const id = Number(this.nuevoId());
    if (id > 0) {
      this.authService.updateUserId(id);
      this.modalIdAbierto.set(false);
      window.location.reload();
    }
  }
}
