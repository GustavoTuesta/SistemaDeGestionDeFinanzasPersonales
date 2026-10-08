// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    vi.restoreAllMocks();
  });

  it('debe inicializarse en modo claro si no hay valor previo ni preferencia', () => {
    const service = new ThemeService();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('debe respetar el valor de localStorage si está definido como dark', () => {
    localStorage.setItem('finanzas_theme', 'dark');
    const service = new ThemeService();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('debe alternar entre dark y light con toggleTheme', () => {
    const service = new ThemeService();
    expect(service.theme()).toBe('light');

    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem('finanzas_theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    service.toggleTheme();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('finanzas_theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
