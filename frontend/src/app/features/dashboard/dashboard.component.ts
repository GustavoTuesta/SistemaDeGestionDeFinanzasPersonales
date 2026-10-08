import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { GastosService, IngresosService, PrestamosService } from '../../core/services/finance-api.service';
import { Gasto, Ingreso, Prestamo } from '../../core/models/finance.models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { forkJoin } from 'rxjs';

interface RecentItem {
  id: number;
  tipo: 'ingreso' | 'gasto' | 'prestamo';
  nombre: string;
  monto: number;
  fecha: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, StatCardComponent, SkeletonComponent, CurrencyFormatPipe],
  template: `
    <div class="space-y-8 animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">Dashboard General</h1>
          <p class="text-sm text-slate-500 mt-1">
            Resumen en tiempo real para <strong class="text-slate-800">{{ user()?.name }}</strong> (ID: {{ user()?.id }}).
          </p>
        </div>
        
        <!-- Acciones rápidas (mínimo 44px de altura táctil) -->
        <div class="flex flex-wrap items-center gap-2">
          <a
            routerLink="/ingresos"
            class="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            + Ingreso
          </a>
          <a
            routerLink="/gastos"
            class="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            + Gasto
          </a>
          <a
            routerLink="/prestamos"
            class="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            + Préstamo
          </a>
        </div>
      </div>

      <!-- Tarjetas de Métricas -->
      @if (isLoading()) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <app-skeleton customClass="h-4 w-24" />
            <app-skeleton customClass="h-8 w-36" />
            <app-skeleton customClass="h-3 w-28" />
          </div>
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <app-skeleton customClass="h-4 w-24" />
            <app-skeleton customClass="h-8 w-36" />
            <app-skeleton customClass="h-3 w-28" />
          </div>
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <app-skeleton customClass="h-4 w-24" />
            <app-skeleton customClass="h-8 w-36" />
            <app-skeleton customClass="h-3 w-28" />
          </div>
          <div class="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3">
            <app-skeleton customClass="h-4 w-24" />
            <app-skeleton customClass="h-8 w-36" />
            <app-skeleton customClass="h-3 w-28" />
          </div>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <app-stat-card
            title="Balance Neto"
            [amount]="balanceNeto()"
            [theme]="balanceNeto() >= 0 ? 'emerald' : 'rose'"
            [subtitle]="balanceNeto() >= 0 ? 'Superávit disponible' : 'Déficit presupuestario'"
          >
            <svg icon class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 18h12l3-18H3z" />
            </svg>
          </app-stat-card>

          <app-stat-card
            title="Total Ingresos"
            [amount]="totalIngresos()"
            theme="emerald"
            [subtitle]="ingresos().length + ' registros activos'"
          >
            <svg icon class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </app-stat-card>

          <app-stat-card
            title="Total Gastos"
            [amount]="totalGastos()"
            theme="rose"
            [subtitle]="gastos().length + ' registros activos'"
          >
            <svg icon class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          </app-stat-card>

          <app-stat-card
            title="Total Préstamos"
            [amount]="totalPrestamos()"
            theme="blue"
            [subtitle]="prestamos().length + ' compromisos registrados'"
          >
            <svg icon class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </app-stat-card>
        </div>
      }

      <!-- Mensaje de Error con Botón de Reintento -->
      @if (errorMessage()) {
        <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 flex-shrink-0 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage() }}</span>
          </div>
          <button
            type="button"
            (click)="cargarDatos()"
            class="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-sm self-start sm:self-auto transition-colors"
          >
            Reintentar
          </button>
        </div>
      }

      <!-- Tabla de Transacciones Recientes -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="text-base font-semibold text-slate-900">Actividad Reciente</h3>
            <p class="text-xs text-slate-500 mt-0.5">Últimos movimientos financieros registrados</p>
          </div>
          <button
            (click)="cargarDatos()"
            class="min-h-[38px] px-2.5 py-1 text-xs text-slate-600 hover:text-emerald-600 font-medium flex items-center gap-1 transition-colors rounded-lg hover:bg-slate-50"
            aria-label="Refrescar datos"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refrescar
          </button>
        </div>

        @if (isLoading()) {
          <div class="p-6 space-y-4">
            <app-skeleton customClass="h-10 w-full" />
            <app-skeleton customClass="h-10 w-full" />
            <app-skeleton customClass="h-10 w-full" />
          </div>
        } @else if (recientes().length === 0) {
          <!-- Empty State con CTA -->
          <div class="p-12 text-center text-slate-400 flex flex-col items-center">
            <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
            </div>
            <p class="text-base font-semibold text-slate-700">No hay movimientos registrados todavía</p>
            <p class="text-xs text-slate-400 mt-1 max-w-sm">Comenzá asentando tus primeros ingresos o gastos con los botones rápidos.</p>
            <div class="mt-4 flex gap-2">
              <a routerLink="/ingresos" class="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100 border border-emerald-200">
                + Crear Ingreso
              </a>
              <a routerLink="/gastos" class="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 rounded-xl hover:bg-rose-100 border border-rose-200">
                + Crear Gasto
              </a>
            </div>
          </div>
        } @else {
          <!-- Tabla responsiva contenida -->
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm min-w-[550px]">
              <thead>
                <tr class="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-6">Tipo</th>
                  <th class="py-3 px-6">Concepto / Categoría</th>
                  <th class="py-3 px-6">Fecha</th>
                  <th class="py-3 px-6 text-right">Monto</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                @for (item of recientes(); track item.tipo + '-' + item.id) {
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    <td class="py-3.5 px-6 whitespace-nowrap">
                      @if (item.tipo === 'ingreso') {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ingreso
                        </span>
                      } @else if (item.tipo === 'gasto') {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Gasto
                        </span>
                      } @else {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Préstamo
                        </span>
                      }
                    </td>
                    <td class="py-3.5 px-6 font-medium text-slate-800">
                      {{ item.nombre }}
                    </td>
                    <td class="py-3.5 px-6 text-slate-500 text-xs">
                      {{ item.fecha | date: 'dd/MM/yyyy HH:mm' }}
                    </td>
                    <td class="py-3.5 px-6 text-right font-semibold whitespace-nowrap" [class.text-emerald-600]="item.tipo === 'ingreso'" [class.text-rose-600]="item.tipo === 'gasto'" [class.text-slate-800]="item.tipo === 'prestamo'">
                      {{ (item.tipo === 'gasto' ? -item.monto : item.monto) | currencyFormat }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private ingresosService = inject(IngresosService);
  private gastosService = inject(GastosService);
  private prestamosService = inject(PrestamosService);

  user = this.authService.currentUser;
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ingresos = signal<Ingreso[]>([]);
  gastos = signal<Gasto[]>([]);
  prestamos = signal<Prestamo[]>([]);

  totalIngresos = computed(() =>
    this.ingresos().reduce((sum, item) => sum + Number(item.amount), 0)
  );

  totalGastos = computed(() =>
    this.gastos().reduce((sum, item) => sum + Number(item.amount), 0)
  );

  balanceNeto = computed(() => this.totalIngresos() - this.totalGastos());

  totalPrestamos = computed(() =>
    this.prestamos().reduce((sum, item) => sum + Number(item.amount), 0)
  );

  recientes = computed<RecentItem[]>(() => {
    const list: RecentItem[] = [
      ...this.ingresos().map((i) => ({
        id: i.id,
        tipo: 'ingreso' as const,
        nombre: `Categoría #${i.categoryId}`,
        monto: Number(i.amount),
        fecha: i.date,
      })),
      ...this.gastos().map((g) => ({
        id: g.id,
        tipo: 'gasto' as const,
        nombre: `Categoría #${g.categoryId}`,
        monto: Number(g.amount),
        fecha: g.date,
      })),
      ...this.prestamos().map((p) => ({
        id: p.id,
        tipo: 'prestamo' as const,
        nombre: p.nombrePrestamo,
        monto: Number(p.amount),
        fecha: p.date,
      })),
    ];

    return list
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 8);
  });

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    const u = this.user();
    if (!u) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    forkJoin({
      ingresos: this.ingresosService.listar(u.id),
      gastos: this.gastosService.listar(u.id),
      prestamos: this.prestamosService.listar(u.id),
    }).subscribe({
      next: ({ ingresos, gastos, prestamos }) => {
        this.ingresos.set(ingresos);
        this.gastos.set(gastos);
        this.prestamos.set(prestamos);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Error al comunicarse con el backend. Verificá que el servidor esté activo.'
        );
      },
    });
  }
}
