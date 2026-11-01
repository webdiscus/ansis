// FOR TEST ONLY!
// force define isTTY in stdout, because vitest set stdout as Socket
process.stdout.isTTY = true;

// Set env variable to simulate truecolor support
process.env.COLORTERM = 'truecolor';

// Delete the variable, because Deno does not isolate the environment or globals per test file
delete process.env.NO_COLOR;