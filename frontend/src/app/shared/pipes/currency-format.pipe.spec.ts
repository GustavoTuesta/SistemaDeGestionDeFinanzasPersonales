import { describe, it, expect } from 'vitest';
import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  const pipe = new CurrencyFormatPipe();

  it('debe devolver $0.00 para valores nulos o indefinidos', () => {
    expect(pipe.transform(null)).toBe('$0.00');
    expect(pipe.transform(undefined)).toBe('$0.00');
    expect(pipe.transform('')).toBe('$0.00');
  });

  it('debe formatear números correctamente', () => {
    const formatted = pipe.transform(1500.5);
    expect(formatted).toContain('1.500,50');
  });

  it('debe formatear strings numéricas correctamente', () => {
    const formatted = pipe.transform('250000');
    expect(formatted).toContain('250.000,00');
  });
});
