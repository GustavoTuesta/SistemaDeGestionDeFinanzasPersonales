import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  shortLabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- 1. Desktop Sidebar (>= 1024px) -->
    <aside class="hidden lg:flex w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex-col justify-between flex-shrink-0 transition-colors duration-200">
      <nav class="space-y-1.5" aria-label="Navegación principal de escritorio">
        <p class="px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Módulos</p>
        
        @for (item of navItems; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 font-semibold border-l-4 border-emerald-600 shadow-sm"
            [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
            class="flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group"
          >
            <span [innerHTML]="item.icon" class="w-5 h-5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"></span>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <div class="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div class="p-3 bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-800/70 dark:to-emerald-950/30 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <p class="text-xs font-semibold text-slate-700 dark:text-slate-200">Control Financiero</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mantené tus cuentas al día categorizando ingresos y gastos.</p>
        </div>
      </div>
    </aside>

    <!-- 2. Mobile Bottom Navigation Bar (< 1024px) Ergonomía táctil para pulgar -->
    <nav 
      class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-1.5 flex justify-around items-center shadow-lg safe-bottom transition-colors duration-200"
      aria-label="Navegación móvil inferior"
    >
      @for (item of navItems; track item.route) {
        <a
          [routerLink]="item.route"
          routerLinkActive="text-emerald-700 dark:text-emerald-400 font-bold"
          [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
          class="flex flex-col items-center justify-center py-1 px-3 min-h-[44px] min-w-[44px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          [attr.aria-label]="item.label"
        >
          <span [innerHTML]="item.icon" class="w-5 h-5 flex items-center justify-center"></span>
          <span class="text-[10px] mt-0.5">{{ item.shortLabel }}</span>
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    {
      label: 'Dashboard General',
      shortLabel: 'Inicio',
      route: '/dashboard',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
    },
    {
      label: 'Ingresos',
      shortLabel: 'Ingresos',
      route: '/ingresos',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>`,
    },
    {
      label: 'Gastos',
      shortLabel: 'Gastos',
      route: '/gastos',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>`,
    },
    {
      label: 'Préstamos',
      shortLabel: 'Préstamos',
      route: '/prestamos',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>`,
    },
  ];
}
