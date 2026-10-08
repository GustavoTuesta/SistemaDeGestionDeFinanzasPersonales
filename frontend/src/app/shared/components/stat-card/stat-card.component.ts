import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, CurrencyFormatPipe],
  template: `
    <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-slate-500">{{ title() }}</span>
        <div [class]="iconBgClass" class="w-10 h-10 rounded-xl flex items-center justify-center">
          <ng-content select="[icon]"></ng-content>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="text-2xl font-bold tracking-tight text-slate-900">
          {{ amount() | currencyFormat }}
        </h3>
        @if (subtitle()) {
          <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
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
        return 'bg-emerald-50 text-emerald-600';
      case 'rose':
        return 'bg-rose-50 text-rose-600';
      case 'amber':
        return 'bg-amber-50 text-amber-600';
      default:
        return 'bg-blue-50 text-blue-600';
    }
  }
}
