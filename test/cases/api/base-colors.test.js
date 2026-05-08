import { describe, expect, test } from 'vitest';
import { esc } from '../../utils/helpers.js';

import '../../env/truecolor.js';

import ansis from 'ansis';

describe('base colors', () => {
  describe('foreground colors', () => {
    test(`ansis.black('foo')`, () => {
      const received = ansis.black('foo');
      const expected = '\x1b[30mfoo\x1b[39m';
      expect(received).toEqual(expected);
    });

    test(`ansis.red('foo')`, () => {
      const received = ansis.red('foo');
      const expected = '\x1b[31mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.green('foo')`, () => {
      const received = ansis.green('foo');
      const expected = '\x1b[32mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.yellow('foo')`, () => {
      const received = ansis.yellow('foo');
      const expected = '\x1b[33mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.blue('foo')`, () => {
      const received = ansis.blue('foo');
      const expected = '\x1b[34mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.magenta('foo')`, () => {
      const received = ansis.magenta('foo');
      const expected = '\x1b[35mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.cyan('foo')`, () => {
      const received = ansis.cyan('foo');
      const expected = '\x1b[36mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.white('foo')`, () => {
      const received = ansis.white('foo');
      const expected = '\x1b[37mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.gray('foo')`, () => {
      const received = ansis.gray('foo');
      const expected = '\x1b[90mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.redBright('foo')`, () => {
      const received = ansis.redBright('foo');
      const expected = '\x1b[91mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.greenBright('foo')`, () => {
      const received = ansis.greenBright('foo');
      const expected = '\x1b[92mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.yellowBright('foo')`, () => {
      const received = ansis.yellowBright('foo');
      const expected = '\x1b[93mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.blueBright('foo')`, () => {
      const received = ansis.blueBright('foo');
      const expected = '\x1b[94mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.magentaBright('foo')`, () => {
      const received = ansis.magentaBright('foo');
      const expected = '\x1b[95mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.cyanBright('foo')`, () => {
      const received = ansis.cyanBright('foo');
      const expected = '\x1b[96mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.whiteBright('foo')`, () => {
      const received = ansis.whiteBright('foo');
      const expected = '\x1b[97mfoo\x1b[39m';
      expect(esc(received)).toEqual(esc(expected));
    });
  });

  describe('background colors', () => {
    test(`ansis.bgBlack('foo')`, () => {
      const received = ansis.bgBlack('foo');
      const expected = '\x1b[40mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgRed('foo')`, () => {
      const received = ansis.bgRed('foo');
      const expected = '\x1b[41mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgGreen('foo')`, () => {
      const received = ansis.bgGreen('foo');
      const expected = '\x1b[42mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgYellow('foo')`, () => {
      const received = ansis.bgYellow('foo');
      const expected = '\x1b[43mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgBlue('foo')`, () => {
      const received = ansis.bgBlue('foo');
      const expected = '\x1b[44mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgMagenta('foo')`, () => {
      const received = ansis.bgMagenta('foo');
      const expected = '\x1b[45mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgCyan('foo')`, () => {
      const received = ansis.bgCyan('foo');
      const expected = '\x1b[46mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgWhite('foo')`, () => {
      const received = ansis.bgWhite('foo');
      const expected = '\x1b[47mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgGray('foo')`, () => {
      const received = ansis.bgGray('foo');
      const expected = '\x1b[100mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgRedBright('foo')`, () => {
      const received = ansis.bgRedBright('foo');
      const expected = '\x1b[101mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgGreenBright('foo')`, () => {
      const received = ansis.bgGreenBright('foo');
      const expected = '\x1b[102mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgYellowBright('foo')`, () => {
      const received = ansis.bgYellowBright('foo');
      const expected = '\x1b[103mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgBlueBright('foo')`, () => {
      const received = ansis.bgBlueBright('foo');
      const expected = '\x1b[104mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgMagentaBright('foo')`, () => {
      const received = ansis.bgMagentaBright('foo');
      const expected = '\x1b[105mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgCyanBright('foo')`, () => {
      const received = ansis.bgCyanBright('foo');
      const expected = '\x1b[106mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });

    test(`ansis.bgWhiteBright('foo')`, () => {
      const received = ansis.bgWhiteBright('foo');
      const expected = '\x1b[107mfoo\x1b[49m';
      expect(esc(received)).toEqual(esc(expected));
    });
  });
});
