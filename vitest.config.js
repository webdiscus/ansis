export default {
  test: {
    include: [
      'test/cases/**/*.test.js',
      'test/cases/**/*.test.ts',
    ],
    coverage: {
      include: [
        'src/**/*',
      ],
    },
    server: {
      deps: {
        inline: [
          'AssertionError: ts',
        ],
      },
    },

    // increase timeout for CI runners
    testTimeout: process.env.CI ? 20000 : 5000,
    hookTimeout: process.env.CI ? 10000 : 5000,
  },
};
