import { expect, describe, test } from 'vitest';

// ansis detects the color level once, when it is imported.
// To override the auto-detected color level in tests, import a setup file
// that defines the desired value in process.env before importing the CLI app.
import '../../env/ansi16-colors.js';

// The CLI app imports and uses ansis.
import cliApp from './cli-app.js';

describe('force color in test', () => {
  test(`base colors`, () => {
    const received = cliApp.color('foo');
    const expected = '[32mfoo[39m';
    expect(received).toEqual(expected);
  });
});