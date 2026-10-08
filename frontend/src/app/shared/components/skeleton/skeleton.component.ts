import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="customClass()"
      class="animate-pulse bg-slate-200/80 dark:bg-slate-800 rounded-xl"
      aria-hidden="true"
    ></div>
  `,
})
export class SkeletonComponent {
  customClass = input<string>('h-4 w-full');
}
