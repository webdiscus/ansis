#!/usr/bin/env node

import { hex } from '../src/index.mjs';
import spectrum from './fixtures/spectrum.js';

const log = console.log;

let str = '';
spectrum.forEach(color => {
  str += hex(color)('█');
});

log();
log(str);
log();
