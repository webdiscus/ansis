// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after the first failure
  // bail: false,

  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest",

  // Automatically clear mock calls and instances between every test
  // clearMocks: false,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['../src/**/*.js'],

  // The directory where Jest should output its coverage files
  // coverageDirectory: null,

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', './utils/'],

  // Indicates which provider should be used to instrument code for coverage.
  // Allowed values are babel (default) or v8.
  // coverageProvider: 'babel',

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "clover"
  //   "json",
  //   "lcov",
  //   "text",
  // ],

  // An object that configures minimum threshold enforcement for coverage results.
  // coverageThreshold: null,

  // This option allows the use of a custom dependency extractor.
  // dependencyExtractor: null,

  // Allows for a label to be printed alongside a test while it is running.
  // displayName: null,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Specify file extensions here that should run with native ESM.
  // extensionsToTreatAsEsm: [],

  // Specify extra properties to be defined inside a vm for faster lookups.
  // extraGlobals: null,

  // Force coverage collection from ignored files using a array of glob patterns
  // forceCoverageMatch: [],

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // This will be used to configure the behavior of jest-haste-map, Jest's internal file crawler/cache system.
  // haste: null,

  // Insert Jest's globals (expect, test, describe, beforeEach etc.) into the global environment.
  injectGlobals: true,

  // A number limiting the number of tests that are allowed to run at the same time when using test.concurrent.
  // maxConcurrency: 5,

  // Specifies the maximum number of workers the worker-pool will spawn for running tests.
  // In single run mode, this defaults to the number of the cores available on your machine minus one for the main thread.
  // maxWorkers: '50%',

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // An alternative API to setting the NODE_PATH env variable, modulePaths is an array of absolute paths to additional locations to search when resolving modules.
  // modulePaths: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: null,

  // Sets the path to the prettier node module used to update inline snapshots.
  // prettierPath: 'prettier',

  // Run tests from one or more projects
  // projects: null,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: null,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within.
  // Default: The root of the directory containing your Jest config file or the package.json or the pwd if no package.json is found.
  // rootDir: null,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // Allows overriding specific snapshot formatting options documented in the pretty-format readme.
  // snapshotFormat: null,

  // The path to a module that can resolve test<->snapshot path. This config option lets you customize where Jest stores snapshot files on disk.
  // snapshotResolver: null,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  //testEnvironment: 'node',
  testEnvironment: 'jest-environment-node',

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // The exit code Jest returns on test failure.
  // testFailureExitCode: 1,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[jt]s?(x)",
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern Jest uses to detect test files
  // testRegex: /(\/__tests__\/.*|(\\.|\/)(test|spec))\\.[jt]sx?$/,

  // This option allows the use of a custom results processor
  // testResultsProcessor: null,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // This option allows you to use a custom sequencer instead of Jest's default. sort may optionally return a Promise.
  // testSequencer: '@jest/test-sequencer',

  // Default timeout of a test in milliseconds.
  testTimeout: 1000,

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: {"\\.[jt]sx?$": "babel-jest"},
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  //   '^.+\\.mjs$': 'babel-jest',
  // },
  // Disable code transforms for ESM
  transform: {},

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: [],

  // Indicates whether each individual test should be reported during the run
  // verbose: false,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // This option allows you to use custom watch plugins.
  // watchPlugins: [],

  // Whether to use watchman for file crawling.
  // watchman: true,
};