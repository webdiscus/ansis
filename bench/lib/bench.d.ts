export interface BenchInterface {
  constructor(options: object): (suiteName: string) => BenchInterface;
  add: (name: string) => BenchInterface;
  run: () => void;
}
