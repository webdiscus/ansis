export default {
  test: {
    include: [
      'test/**/*.test.js',
      'test/**/*.test.ts',
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

    // CI runners are slower, give more time and reduce threading
    testTimeout: process.env.CI ? 20000 : 5000,
    hookTimeout: process.env.CI ? 10000 : 5000,
    threads: !process.env.CI,

    // Less noisy logs on CI, keep logs locally
    silent: !!process.env.CI,
  },
};
