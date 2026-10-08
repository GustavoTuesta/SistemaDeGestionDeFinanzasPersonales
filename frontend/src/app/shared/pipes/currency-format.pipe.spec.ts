import { describe, it, expect } from 'vitest';
import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  const pipe = new CurrencyFormatPipe();

  it('debe devolver S/ 0.00 para valores nulos o indefinidos', () => {
    expect(pipe.transform(null)).toBe('S/ 0.00');
    expect(pipe.transform(undefined)).toBe('S/ 0.00');
    expect(pipe.transform('')).toBe('S/ 0.00');
  });

  it('debe formatear números correctamente', () => {
    const formatted = pipe.transform(1500.5);
    expect(formatted).toContain('1,500.50');
    expect(formatted).toContain('S/');
  });

  it('debe formatear strings numéricas correctamente', () => {
    const formatted = pipe.transform('250000');
    expect(formatted).toContain('250,000.00');
    expect(formatted).toContain('S/');
  });
});
