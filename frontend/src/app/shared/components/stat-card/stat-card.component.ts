import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  template: `
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ title() }}</span>
        <div [class]="iconBgClass" class="w-10 h-10 rounded-xl flex items-center justify-center">
          <ng-content select="[icon]"></ng-content>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {{ amount() | currencyFormat }}
        </h3>
        @if (subtitle()) {
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1">
            {{ subtitle() }}
          </p>
        }
      </div>
    </div>
  `,
})
export class StatCardComponent {
  title = input.required<string>();
  amount = input.required<number | string>();
  subtitle = input<string>('');
  theme = input<'emerald' | 'rose' | 'blue' | 'amber'>('blue');

  get iconBgClass(): string {
    switch (this.theme()) {
      case 'emerald':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400';
      case 'rose':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400';
      case 'amber':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400';
    }
  }
}
