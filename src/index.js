import { getColorSupport } from './color-support.js';

export class Ansis {
  constructor(options = {}) {
    this.stream = options.stream || process.stdout;
    this.enabled = options.enabled !== undefined ? options.enabled : getColorSupport(this.stream);
  }

  // ... implementation details
}