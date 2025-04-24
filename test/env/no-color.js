// Set env variable to simulate no color
process.env.NO_COLOR = '1';

// FOR TEST ONLY!
// force define isTTY in stdout, because vitest set stdout as Socket
process.stdout.isTTY = true;