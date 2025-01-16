import { performance } from 'perf_hooks';

// A large string with a newline at the end
const output = 'a'.repeat(1e6) + '\n';

// Number of iterations
const iterations = 1e6;
let count = 0;
let start;

// Benchmark ~indexOf
start = performance.now();
for (let i = 0; i < iterations; i++) {
  if (~output.indexOf('\n')) {
    //if (output.indexOf('\n') > -1) {
    count++;
  }
}
let indexOfTime = performance.now() - start;

// Benchmark includes
start = performance.now();
for (let i = 0; i < iterations; i++) {
  if (output.includes('\n')) {
    count++;
  }
}
let includesTime = performance.now() - start;

// node.js v22.11.0
// ~indexOf: 720.20 ms
// includes: 159.38 ms <= 5x faster then indexOf

console.log(`~indexOf: ${indexOfTime.toFixed(2)} ms`);
console.log(`includes: ${includesTime.toFixed(2)} ms`);
