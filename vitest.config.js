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
        ]
      }
    },
  },
}
