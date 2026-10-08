import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { PrestamosService } from '../../core/services/finance-api.service';
import { Prestamo } from '../../core/models/finance.models';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-prestamos',
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
            <span class="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </span>
            <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Módulo de Préstamos</h1>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Controlá tus créditos, pasivos y compromisos financieros</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-xl px-4 py-2 text-right">
            <span class="text-xs text-blue-700 dark:text-blue-300 font-medium block">Total Compromisos</span>
            <span class="text-lg font-bold text-blue-800 dark:text-blue-200">{{ total() | currencyFormat }}</span>
          </div>

          <button
            type="button"
            (click)="abrirModalCrear()"
            class="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Nuevo Préstamo
          </button>
        </div>
      </div>

      <!-- Barra de Filtros / Búsqueda -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div class="relative flex-1">
          <input
            type="text"
            [(ngModel)]="busqueda"
            placeholder="Buscar préstamo por nombre o monto..."
            class="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <svg class="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400 px-1">
          Mostrando {{ filtrados().length }} de {{ prestamos().length }} registros
        </div>
      </div>

      <!-- Feedback Banner -->
      @if (feedback()) {
        <div [class]="feedback()?.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'" class="p-3.5 rounded-xl border text-sm flex items-center justify-between">
          <span>{{ feedback()?.message }}</span>
          <button (click)="feedback.set(null)" class="text-xs font-bold opacity-60 hover:opacity-100 p-1" aria-label="Cerrar notificación">✕</button>
        </div>
      }

      <!-- Tabla de Préstamos -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        @if (isLoading()) {
          <div class="p-6 space-y-4">
            <app-skeleton customClass="h-10 w-full" />
            <app-skeleton customClass="h-10 w-full" />
            <app-skeleton customClass="h-10 w-full" />
          </div>
        } @else if (filtrados().length === 0) {
          <div class="p-12 text-center text-slate-400 dark:text-slate-500 flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-base font-semibold text-slate-700 dark:text-slate-200">No se encontraron préstamos</p>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Registrá un crédito o préstamo con el botón superior.</p>
            <button
              (click)="abrirModalCrear()"
              class="mt-4 min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800"
            >
              + Agregar Préstamo
            </button>
          </div>
        } @else {
          <div class="w-full overflow-x-auto">
            <table class="w-full text-left border-collapse text-sm min-w-[600px]">
              <thead>
                <tr class="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th class="py-3 px-6">ID</th>
                  <th class="py-3 px-6">Nombre del Préstamo</th>
                  <th class="py-3 px-6">Fecha</th>
                  <th class="py-3 px-6 text-right">Monto</th>
                  <th class="py-3 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                @for (item of filtrados(); track item.id) {
                  <tr class="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="py-3.5 px-6 font-mono text-xs text-slate-400 dark:text-slate-500">#{{ item.id }}</td>
                    <td class="py-3.5 px-6 font-medium text-slate-800 dark:text-slate-200">
                      {{ item.nombrePrestamo }}
                    </td>
                    <td class="py-3.5 px-6 text-slate-500 dark:text-slate-400 text-xs">
                      {{ item.date | date: 'dd/MM/yyyy HH:mm' }}
                    </td>
                    <td class="py-3.5 px-6 text-right font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {{ item.amount | currencyFormat }}
                    </td>
                    <td class="py-3.5 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        (click)="abrirModalEditar(item)"
                        class="min-h-[38px] px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        (click)="abrirConfirmEliminar(item.id)"
                        class="min-h-[38px] px-3 py-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-200 dark:border-rose-900/60"
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
        [title]="editandoId() ? 'Modificar Préstamo' : 'Registrar Nuevo Préstamo'"
        (closed)="cerrarModal()"
      >
        <form [formGroup]="form" (ngSubmit)="guardar()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre / Entidad del Préstamo</label>
            <input
              type="text"
              formControlName="nombrePrestamo"
              placeholder="Ej: Préstamo Banco Santander"
              class="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
            />
            @if (form.get('nombrePrestamo')?.touched && form.get('nombrePrestamo')?.invalid) {
              <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">El nombre del préstamo no puede estar vacío.</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300">Monto (S/ PEN)</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              formControlName="amount"
              placeholder="0.00"
              class="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3.5 py-2.5 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all"
            />
            @if (form.get('amount')?.touched && form.get('amount')?.invalid) {
              <p class="mt-1 text-xs text-rose-600 dark:text-rose-400">El monto debe ser un número mayor a 0.</p>
            }
          </div>

          <div class="mt-6 flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              (click)="cerrarModal()"
              class="min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              [disabled]="form.invalid || isSaving()"
              class="min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-all"
            >
              {{ isSaving() ? 'Guardando...' : (editandoId() ? 'Actualizar' : 'Guardar Préstamo') }}
            </button>
          </div>
        </form>
      </app-modal>

      <!-- Diálogo de Confirmación para Eliminar -->
      <app-confirm-dialog
        [isOpen]="confirmEliminarAbierto()"
        title="¿Eliminar este préstamo?"
        message="Se eliminará permanentemente de tu registro de compromisos."
        confirmText="Sí, eliminar"
        (confirmed)="confirmarEliminar()"
        (cancelled)="confirmEliminarAbierto.set(false)"
      />
    </div>
  `,
})
export class PrestamosComponent implements OnInit {
  private authService = inject(AuthService);
  private prestamosService = inject(PrestamosService);
  private fb = inject(FormBuilder);

  user = this.authService.currentUser;
  prestamos = signal<Prestamo[]>([]);
  isLoading = signal(true);
  isSaving = signal(false);
  busqueda = signal('');

  modalAbierto = signal(false);
  editandoId = signal<number | null>(null);
  confirmEliminarAbierto = signal(false);
  idParaEliminar = signal<number | null>(null);
  feedback = signal<{ message: string; type: 'success' | 'error' } | null>(null);

  total = computed(() =>
    this.prestamos().reduce((sum, item) => sum + Number(item.amount), 0)
  );

  filtrados = computed(() => {
    const term = this.busqueda().toLowerCase().trim();
    if (!term) return this.prestamos();

    return this.prestamos().filter((item) => {
      const nombre = item.nombrePrestamo.toLowerCase();
      const amountStr = item.amount.toString();
      return nombre.includes(term) || amountStr.includes(term);
    });
  });

  form = this.fb.group({
    nombrePrestamo: ['', [Validators.required, Validators.minLength(2)]],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
  });

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    const u = this.user();
    if (!u) return;

    this.isLoading.set(true);
    this.prestamosService.listar(u.id).subscribe({
      next: (data) => {
        this.prestamos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.feedback.set({
          message: err.error?.message || 'Error al listar los préstamos.',
          type: 'error',
        });
      },
    });
  }

  abrirModalCrear(): void {
    this.editandoId.set(null);
    this.form.reset({ nombrePrestamo: '', amount: null });
    this.modalAbierto.set(true);
  }

  abrirModalEditar(item: Prestamo): void {
    this.editandoId.set(item.id);
    this.form.patchValue({
      nombrePrestamo: item.nombrePrestamo,
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
    this.prestamosService.eliminar(id).subscribe({
      next: () => {
        this.feedback.set({ message: 'Préstamo eliminado con éxito.', type: 'success' });
        this.cargarPrestamos();
      },
      error: (err) => {
        this.feedback.set({
          message: err.error?.message || 'Error al eliminar el préstamo.',
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
      this.prestamosService
        .actualizar(id, {
          nombrePrestamo: val.nombrePrestamo!,
          amount: Number(val.amount),
        })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.cerrarModal();
            this.feedback.set({ message: 'Préstamo actualizado con éxito.', type: 'success' });
            this.cargarPrestamos();
          },
          error: (err) => {
            this.isSaving.set(false);
            this.feedback.set({
              message: err.error?.message || 'Error al actualizar el préstamo.',
              type: 'error',
            });
          },
        });
    } else {
      this.prestamosService
        .crear({
          userId: u.id,
          nombrePrestamo: val.nombrePrestamo!,
          amount: Number(val.amount),
        })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.cerrarModal();
            this.feedback.set({ message: 'Préstamo registrado con éxito.', type: 'success' });
            this.cargarPrestamos();
          },
          error: (err) => {
            this.isSaving.set(false);
            this.feedback.set({
              message: err.error?.message || 'Error al registrar el préstamo.',
              type: 'error',
            });
          },
        });
    }
  }
}
