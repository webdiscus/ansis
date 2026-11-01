// FOR TEST ONLY!
// force define isTTY in stdout, because vitest set stdout as Socket
process.stdout.isTTY = true;

// Set env variable to simulate ANSI 256 colors support
process.env.COLORTERM = 'ansi256';

// Delete the variable, because Deno does not isolate the environment or globals per test file
delete process.env.NO_COLOR;