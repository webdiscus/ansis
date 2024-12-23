export default {
  test: {
    include: [
      'test/**/*.test.js',
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
