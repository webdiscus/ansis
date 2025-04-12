import { describe, test, expect } from 'vitest';
import ansis, { Ansis, AnsiColors, AnsiStyles, AnsiColorsExtend, ansi256, rgb, hex } from 'ansis';

describe('Types validation', () => {
  // test('Ansis type should be an instance of SP & DP', () => {
  //   // Test that Ansis type is a valid intersection of SP and DP
  //   const instance: Ansis = {
  //     //...fg(1),
  //     //...rgb(1, 2, 3),
  //     isSupported: () => true,
  //     strip: (s) => s,
  //     extend: (colors) => {},
  //     open: 'open',
  //     close: 'close',
  //     ansi256: fg(1),
  //     // bgAnsi256: fg(1),
  //     // bg: fg(1),
  //     // rgb: rgb(1, 2, 3),
  //     // bgRgb: rgb(1, 2, 3),
  //     // hex: hex('123456'),
  //     // bgHex: hex('123456'),
  //   };
  //
  //   expect(instance).toHaveProperty('open');
  //   expect(instance).toHaveProperty('close');
  // });

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

    // Type assertion for AnsiColorsExtend
    //const extendedColor: AnsiColorsExtend<typeof result> = result;

    expect(result).toHaveProperty('purple');
  });
});