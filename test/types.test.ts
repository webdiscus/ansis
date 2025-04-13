import { describe, test, expect } from 'vitest';
import ansis, { Ansis, AnsiColors, AnsiStyles, AnsiColorsExtend, ansi256, rgb, hex } from 'ansis';

function assertType<T>(value: T): void {
  // do nothing, just let the compiler verify
}

describe('Types validation', () => {
  test('isSupported function should return a boolean', () => {
    const result = ansis.isSupported();
    expect(result).toBeTypeOf('boolean');
  });

  test('strip function should return a string', () => {
    const result = ansis.strip('test string');
    expect(result).toBeTypeOf('string');
  });

  test('ansi256 function should return an Ansis instance', () => {
    const result = ansi256(255);
    const checkAnsis: Ansis = result;
    expect(result).toBeInstanceOf(Object);
    expect(checkAnsis).toBeTruthy();
  });

  test('rgb function should return an Ansis instance', () => {
    const result = rgb(255, 0, 0);
    const checkAnsis: Ansis = result;
    expect(result).toBeInstanceOf(Object);
    expect(checkAnsis).toBeTruthy();
  });

  test('hex function should return an Ansis instance', () => {
    const result = hex('#ff0000');
    const checkAnsis: Ansis = result;
    expect(result).toBeInstanceOf(Object);
    expect(checkAnsis).toBeTruthy();
  });

  test('result should be of type AnsiColors', () => {
    const color: AnsiColors = 'red';
    // TypeScript will ensure this is a valid AnsiColor
    expect(color).toBe('red');
  });

  test('AnsiStyles should contain valid string literals', () => {
    const validAnsiStyles: AnsiStyles[] = [
      'reset', 'inverse', 'hidden', 'visible', 'bold', 'dim', 'italic', 'underline', 'strikethrough'
    ];

    validAnsiStyles.forEach((style) => {
      const check: AnsiStyles = style;
      expect(check).toBeTruthy();
    });
  });

  test('AnsiStyles should reject invalid values', () => {
    const validStyles: AnsiStyles[] = [
      'reset', 'inverse', 'hidden', 'visible', 'bold', 'dim', 'italic', 'underline', 'strikethrough'
    ];

    const invalidAnsiStyles = ['bolditalic', 'strike', 'none'];

    invalidAnsiStyles.forEach((style) => {
      // Ensuring that invalid values are rejected
      expect(validStyles.includes(style as AnsiStyles)).toBe(false);
    });
  });
});

describe('AnsiColorsExtend validation', () => {
  test('AnsiColorsExtend should accept known AnsiColors', () => {
    const color: AnsiColorsExtend<'red'> = 'red';
    expect(color).toBe('red');
  });

  test('AnsiColorsExtend should accept extended color strings', () => {
    const custom: AnsiColorsExtend<'orange'> = 'orange';
    expect(custom).toBe('orange');
  });

  test('AnsiColorsExtend type should accept both AC and the extended type', () => {
    type TestType = AnsiColorsExtend<string>;
    const testInstance: TestType = 'red'; // AC is part of the union
    expect(testInstance).toBeTypeOf('string');
  });

  test('extend function should handle types correctly for AnsiColorsExtend', () => {
    const mockExtend = <T extends string>(colors: Record<string, T>) => {
      return ansis.extend(colors);
    };

    const result = mockExtend({ 'purple': 'rgb(128, 0, 128)' });
    expect(result).toHaveProperty('purple');
  });

  test('should treat extended color as string at runtime', () => {
    const color = 'orange';

    // TypeScript ensures this is assignable to AnsiColorsExtend<'orange'>
    const extendedColor: AnsiColorsExtend<typeof color> = color;

    // At runtime, it's a string
    expect(typeof extendedColor).toBe('string');
    expect(extendedColor).toBe('orange');
  });

});

// Check types at compile time (IDE editor), not at runtime (vitest).
describe('Type validation at compilation', () => {
  test('AnsiColorsExtend should reject non-string values', () => {
    // @ts-expect-error - numbers are not assignable
    const invalid: AnsiColorsExtend<'orange'> = 123;
  });

  test('AnsiColorsExtend type accepts extended string', () => {
    const color = 'orange';
    assertType<AnsiColorsExtend<typeof color>>(color);
  });
});