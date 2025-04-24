// Set env variable to simulate ANSI 16 colors
process.env.COLORTERM = 'ansi';

// Delete the variable, because Deno does not isolate the environment or globals per test file
delete process.env.NO_COLOR;