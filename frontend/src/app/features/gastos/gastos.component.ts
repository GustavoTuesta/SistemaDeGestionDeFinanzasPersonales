import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { GastosService } from '../../core/services/finance-api.service';
import { CategoryOption, Gasto } from '../../core/models/finance.models';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyFormatPipe,
    ModalComponent,
    ConfirmDialogComponent,
    SkeletonComponent,
  ],
  template: `
    <div class="space-y-6 animate-fade-in">
      <!-- Encabezado del Módulo -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="p-2 rounded-xl bg-rose-50 text-rose-600">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" /></svg>
            </span>
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">Módulo de Gastos</h1>
          </div>
          <p class="text-sm text-slate-500 mt-1">Monitoreá egresos, consumos y pagos realizados</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="bg-rose-50 border border-rose-200/80 rounded-xl px-4 py-2 text-right">
            <span class="text-xs text-rose-700 font-medium block">Total Egresado</span>
            <span class="text-lg font-bold text-rose-800">{{ total() | currencyFormat }}</span>
          </div>

          <button
            type="button"
            (click)="abrirModalCrear()"
            class="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Nuevo Gasto
          </button>
        </div>
      </div>

      <!-- Barra de Filtros / Búsqueda -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div class="relative flex-1">
          <input
            type="text"
            [(ngModel)]="busqueda"
            placeholder="Buscar por categoría o monto..."
            class="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
          <svg class="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div class="text-xs text-slate-500 px-1">
          Mostrando {{ filtrados().length }} de {{ gastos().length }} registros
        </div>
      </div>

      <!-- Feedback Banner -->
      @if (feedback()) {
        <div [class]="feedback()?.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'" class="p-3.5 rounded-xl border text-sm flex items-center justify-between">
          <span>{{ feedback()?.message }}</span>
          <button (click)="feedback.set(null)" class="text-xs font-bold opacity-60 hover:opacity-100 p-1" aria-label="Cerrar notificación">✕</button>
        </div>
      }

      <!-- Tabla de Gastos -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        @if (isLoading()) {
          <div class="p-6 space-y-4">
            <app-skeleton customClass="h-10 w-full" />
            <app-skeleton customClass="h-10 w-full" />
            <app-skeleton customClass="h-10 w-full" />
          </div>
        } @else if (filtrados().length === 0) {
          <div class="p-12 text-center text-slate-400 flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p class="text-base font-semibold text-slate-700">No se encontraron gastos</p>
            <p class="text-xs text-slate-400 mt-1">Podés registrar tu primer gasto con el botón superior.</p>
            <button
              (click)="abrirModalCrear()"
              class="mt-4 min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200"
            >
              + Agregar Gasto
            </button>
          </div>
        } @else {
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm min-w-[600px]">
              <thead>
                <tr class="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th class="py-3 px-6">ID</th>
                  <th class="py-3 px-6">Categoría</th>
                  <th class="py-3 px-6">Fecha</th>
                  <th class="py-3 px-6 text-right">Monto</th>
                  <th class="py-3 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                @for (item of filtrados(); track item.id) {
                  <tr class="hover:bg-slate-50/60 transition-colors">
                    <td class="py-3.5 px-6 font-mono text-xs text-slate-400">#{{ item.id }}</td>
                    <td class="py-3.5 px-6 font-medium text-slate-800">
                      <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                        {{ obtenerNombreCategoria(item.categoryId) }}
                      </span>
                    </td>
                    <td class="py-3.5 px-6 text-slate-500 text-xs">
                      {{ item.date | date: 'dd/MM/yyyy HH:mm' }}
                    </td>
                    <td class="py-3.5 px-6 text-right font-bold text-rose-600 whitespace-nowrap">
                      {{ item.amount | currencyFormat }}
                    </td>
                    <td class="py-3.5 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        (click)="abrirModalEditar(item)"
                        class="min-h-[38px] px-3 py-1 text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        (click)="abrirConfirmEliminar(item.id)"
                        class="min-h-[38px] px-3 py-1 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- Modal de Creación / Edición -->
      <app-modal
        [isOpen]="modalAbierto()"
        [title]="editandoId() ? 'Modificar Gasto' : 'Registrar Nuevo Gasto'"
        (closed)="cerrarModal()"
      >
        <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700">Categoría</label>
            <select
              formControlName="categoryId"
              class="mt-1 block w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm transition-all"
            >
              @for (cat of categorias; track cat.id) {
                <option [value]="cat.id">{{ cat.name }} (ID: {{ cat.id }})</option>
              }
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700">Monto (S/ PEN)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              formControlName="amount"
              placeholder="0.00"
              class="mt-1 block w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm transition-all"
            />
            @if (form.get('amount')?.touched && form.get('amount')?.invalid) {
              <p class="mt-1 text-xs text-rose-600">El monto debe ser un número mayor a 0.</p>
            }
          </div>

          <div class="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              (click)="cerrarModal()"
              class="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || isSaving()"
              class="min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm disabled:opacity-50 transition-all"
            >
              {{ isSaving() ? 'Guardando...' : (editandoId() ? 'Actualizar' : 'Guardar Gasto') }}
            </button>
          </div>
        </form>
      </app-modal>

      <!-- Diálogo de Confirmación para Eliminar -->
      <app-confirm-dialog
        [isOpen]="confirmEliminarAbierto()"
        title="¿Eliminar este gasto?"
        message="Se eliminará permanentemente de tu registro financiero."
        confirmText="Sí, eliminar"
        (confirmed)="confirmarEliminar()"
        (cancelled)="confirmEliminarAbierto.set(false)"
      />
    </div>
  `,
})
export class GastosComponent implements OnInit {
  private authService = inject(AuthService);
  private gastosService = inject(GastosService);
  private fb = inject(FormBuilder);

  user = this.authService.currentUser;
  gastos = signal<Gasto[]>([]);
  isLoading = signal(true);
  isSaving = signal(false);
  busqueda = signal('');

  modalAbierto = signal(false);
  editandoId = signal<number | null>(null);
  confirmEliminarAbierto = signal(false);
  idParaEliminar = signal<number | null>(null);
  feedback = signal<{ message: string; type: 'success' | 'error' } | null>(null);

  readonly categorias: CategoryOption[] = [
    { id: 1, name: 'Supermercado y Comida' },
    { id: 2, name: 'Servicios y Alquiler' },
    { id: 3, name: 'Transporte y Combustible' },
    { id: 4, name: 'Salud y Farmacia' },
    { id: 5, name: 'Ocio y Entretenimiento' },
  ];

  total = computed(() =>
    this.gastos().reduce((sum, item) => sum + Number(item.amount), 0)
  );

  filtrados = computed(() => {
    const term = this.busqueda().toLowerCase().trim();
    if (!term) return this.gastos();

    return this.gastos().filter((item) => {
      const cat = this.obtenerNombreCategoria(item.categoryId).toLowerCase();
      const amountStr = item.amount.toString();
      return cat.includes(term) || amountStr.includes(term);
    });
  });

  form = this.fb.group({
    categoryId: [1, [Validators.required, Validators.min(1)]],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
  });

  ngOnInit(): void {
    this.cargarGastos();
  }

  cargarGastos(): void {
    const u = this.user();
    if (!u) return;

    this.isLoading.set(true);
    this.gastosService.listar(u.id).subscribe({
      next: (data) => {
        this.gastos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.feedback.set({
          message: err.error?.message || 'Error al listar los gastos.',
          type: 'error',
        });
      },
    });
  }

  abrirModalCrear(): void {
    this.editandoId.set(null);
    this.form.reset({ categoryId: 1, amount: null });
    this.modalAbierto.set(true);
  }

  abrirModalEditar(item: Gasto): void {
    this.editandoId.set(item.id);
    this.form.patchValue({
      categoryId: item.categoryId,
      amount: Number(item.amount),
    });
    this.modalAbierto.set(true);
  }

  cerrarModal(): void {
    this.modalAbierto.set(false);
    this.editandoId.set(null);
  }

  abrirConfirmEliminar(id: number): void {
    this.idParaEliminar.set(id);
    this.confirmEliminarAbierto.set(true);
  }

  confirmarEliminar(): void {
    const id = this.idParaEliminar();
    if (!id) return;

    this.confirmEliminarAbierto.set(false);
    this.gastosService.eliminar(id).subscribe({
      next: () => {
        this.feedback.set({ message: 'Gasto eliminado satisfactoriamente.', type: 'success' });
        this.cargarGastos();
      },
      error: (err) => {
        this.feedback.set({
          message: err.error?.message || 'Error al eliminar el gasto.',
          type: 'error',
        });
      },
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    const u = this.user();
    if (!u) return;

    this.isSaving.set(true);
    const val = this.form.getRawValue();

    const id = this.editandoId();
    if (id) {
      this.gastosService
        .actualizar(id, {
          categoryId: Number(val.categoryId),
          amount: Number(val.amount),
        })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.cerrarModal();
            this.feedback.set({ message: 'Gasto actualizado con éxito.', type: 'success' });
            this.cargarGastos();
          },
          error: (err) => {
            this.isSaving.set(false);
            this.feedback.set({
              message: err.error?.message || 'Error al actualizar el gasto.',
              type: 'error',
            });
          },
        });
    } else {
      this.gastosService
        .crear({
          userId: u.id,
          categoryId: Number(val.categoryId),
          amount: Number(val.amount),
        })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.cerrarModal();
            this.feedback.set({ message: 'Gasto registrado con éxito.', type: 'success' });
            this.cargarGastos();
          },
          error: (err) => {
            this.isSaving.set(false);
            this.feedback.set({
              message: err.error?.message || 'Error al registrar el gasto.',
              type: 'error',
            });
          },
        });
    }
  }

  obtenerNombreCategoria(id: number): string {
    const found = this.categorias.find((c) => c.id === id);
    return found ? found.name : `Categoría #${id}`;
  }
}
