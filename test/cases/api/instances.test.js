import { describe, expect, test } from 'vitest';
import { Ansis } from 'ansis';

describe('instance isolation with different color levels', () => {
  test('level 0 chained styles stay unstyled', () => {
    // The instance's must use own color level.
    // Note: Instance creation order matters: fullColor must be created last
    const noColor = new Ansis(0);
    const fullColor = new Ansis(3);

    expect(noColor.red.bold('foo')).toEqual('foo');
  });

  test('level 3 chained styles stay styled', () => {
    // Later instances must not replace the prototype used by earlier chains.
    // Note: Instance creation order matters: noColor must be created last
    const fullColor = new Ansis(3);
    const noColor = new Ansis(0);

    expect(fullColor.red.bold('foo')).toEqual('\x1b[31m\x1b[1mfoo\x1b[22m\x1b[39m');
  });

  test('direct styles stay isolated', () => {
    const noColor = new Ansis(0);
    const fullColor = new Ansis(3);

    expect(noColor.red('foo')).toEqual('foo');
    expect(fullColor.red('foo')).toEqual('\x1b[31mfoo\x1b[39m');
  });

  test('extend on first instance should not affect its standard styles', () => {
    // Note: Instance creation order matters: noColor must be created last
    const fullColor = new Ansis(3);
    const noColor = new Ansis(0);

    fullColor.extend({ pink: '#ff69b4' });

    expect(fullColor.red('foo')).toEqual('\x1b[31mfoo\x1b[39m');
  });
});