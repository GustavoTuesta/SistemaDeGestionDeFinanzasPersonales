import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 overflow-y-auto" role="alertdialog" aria-modal="true" [attr.aria-labelledby]="title()">
        <!-- Backdrop con desenfoque suave -->
        <div 
          (click)="onCancel()"
          class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        ></div>

        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-slate-100 dark:border-slate-800 p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">{{ title() }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{{ message() }}</p>
              </div>
            </div>

            <div class="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
              <button
                type="button"
                (click)="onCancel()"
                class="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Cancelar
              </button>
              <button
                type="button"
                (click)="onConfirm()"
                class="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                {{ confirmText() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialogComponent {
  isOpen = input<boolean>(false);
  title = input<string>('¿Confirmar acción?');
  message = input<string>('Esta acción no se puede deshacer.');
  confirmText = input<string>('Eliminar');

  confirmed = output<void>();
  cancelled = output<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
