import ansi, { Ansis } from 'ansis';

const color = new Ansis(1);

// TODO: auto detect color support and fix ENV variables for bare runtime
let thisRef = globalThis;
let proc = thisRef.process ?? {};
let argv = proc.argv ?? [];
let env = proc.env ?? {};

console.log('ENV: ', env);
console.log('proc: ', proc);

console.log(ansi.green`Hello from Bare! (auto detect color support)`);
console.log(color.green`Hello from Bare! (force color)`);
