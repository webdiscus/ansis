import Benchmark from 'benchmark';
import { Ansis } from '../../src/index.js';

const benchStyle = new Ansis();

/**
 *
 * @typedef {Object} BenchOptions
 * @property {number?} minNameWidth Minimal width of the name.
 *   The name string pads with space until the resulting string reaches the given width.
 * @property {number?} minOpsWidth Minimal width of the ops (Operations Pro Seconds).
 *   The ops string pads with space until the resulting string reaches the given width.
 * @property {StyleFunction?} suiteNameColor The color of suite name.
 * @property {StyleFunction?} benchNameColor The color of benchmark name.
 * @property {StyleFunction?} statUnitColor The color of statistic units.
 * @property {StyleFunction?} opsColor The color of ops value.
 * @property {StyleFunction?} rmeColor The color of relative margin of error (expressed as a percentage of the mean) value.
 * @property {StyleFunction?} failColor The color of fail string.
 */
const defaultOptions = {
  minNameWidth: 15,
  minOpsWidth: 15,
  suiteNameColor: benchStyle.yellow.underline,
  benchNameColor: benchStyle.visible,
  opsColor: benchStyle.cyanBright,
  rmeColor: benchStyle.visible,
  statUnitColor: benchStyle.visible,
  failColor: benchStyle.red.bold,
};
let errors = {};

/**
 * @param {Event} event
 */
let showResult = function (event) {
  const { minNameWidth, minOpsWidth, benchNameColor, opsColor, rmeColor, statUnitColor, failColor } = this.options;
  const { hz, stats, error } = event.target;
  const name = getName(event);
  // <count> runs sampled
  const count = stats.sample.length,
    ops = (hz.toFixed(hz < 100 ? 2 : 0) * 1).toLocaleString().padStart(minOpsWidth),
    rme = stats.rme.toFixed(2),
    plusminus = '\xb1',
    namePadding = Math.max(minNameWidth, this.maxNameWidth) + 1;

  let statsString = '';

  if (error) {
    statsString = failColor(`FAIL`.padStart(minOpsWidth));
  } else {
    statsString = `${opsColor(ops)} ${statUnitColor('ops/sec')} ${plusminus} ${rmeColor(rme)}${statUnitColor('%')} `;
  }

  process.stdout.write(`\x1b[G${benchNameColor(name.padEnd(namePadding))} ${statsString}`);
};

const getName = (event) =>
  event.target.name || (isNaN(event.target.id) ? event.target.id : `<Test #${event.target.id}>`);

const onComplete = (event) => {
  const { error } = event.target;

  if (!error) {
    showResult(event);
  }

  process.stdout.write(`\n`);
};

const onError = function (event) {
  const { name, error } = event.target;
  errors[name] = error;
};

class Bench {
  name = 'Bench';
  benchNames = [];
  maxNameWidth = 0;

  /**
   * @param {BenchOptions} options
   * @returns {function(suiteName: string): Bench}
   */
  constructor(options = {}) {
    this.options = Object.assign(defaultOptions, options);
    showResult = showResult.bind(this);

    return (suiteName) => {
      if (suiteName) this.name = suiteName;
      this.suite = new Benchmark.Suite(suiteName);

      return this;
    };
  }

  /**
   * Add the benchmark to suite.
   *
   * @param {string} name The name of benchmark.
   * @param {Function} fn The function of benchmark.
   * @returns {Bench}
   */
  add(name, fn) {
    this.benchNames.push(name);
    this.suite.add(name, {
      onStart: () => {},
      onCycle: showResult,
      onComplete: onComplete,
      onError: onError,
      fn: fn,
    });
    return this;
  }

  /**
   * Run all benchmark from the suite.
   */
  run() {
    const { suiteNameColor } = this.options;
    this.maxNameWidth = Math.max(...this.benchNames.map((name) => name.length));
    this.benchNames = [];

    console.log(`\n${suiteNameColor(this.name)}`);
    this.suite.run({ async: false });
  }
}

export default Bench;
