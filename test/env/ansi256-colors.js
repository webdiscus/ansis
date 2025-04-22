// Set env variable to simulate ANSI 256 color space
process.env.COLORTERM = 'ansi256';

// Delete the variable, because Deno does not isolate the environment or globals per test file
delete process.env.NO_COLOR;