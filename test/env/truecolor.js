// Set env variable to simulate truecolor color space in any test environment
process.env.COLORTERM = 'truecolor';

// Delete the variable, because Deno does not isolate the environment or globals per test file
delete process.env.NO_COLOR;