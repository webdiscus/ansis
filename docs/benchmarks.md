
## Benchmarks

> [!CAUTION]
>
> The benchmark results are meaningless numbers intended purely to promote the library and increase its popularity.
> All libraries are more than fast enough.
> These results only to show the effectiveness of micro-optimizations in the code, which does not impact on real-world usage.
>
> Of course **Picocolors** will be a little bit faster in a micro-benchmark since it has less code and doesn't handles [edge cases](../README.md#edge-cases).
>
> _Taken from the [comment](https://github.com/babel/babel/pull/13783#issuecomment-927317201) by the creator of Chalk._

To measure performance is used [benchmark.js](https://github.com/bestiejs/benchmark.js).

> [!WARNING]
>
> Results of [vitest benchmark](https://vitest.dev/config/#benchmark) are incorrect.
>
> The `vitest benchmark` generate **unreal** results.\
> For example, the results of the simple bench:
> ```
> chalk.red('foo') -  7.000.000 ops/sec
> ansis.red('foo') - 23.000.000 ops/sec (x3 faster is incorrect result)
> ```
>
> The actual performance results of Chalk and Ansis in this test are very similar.

### Run benchmarks

```bash
git clone https://github.com/webdiscus/ansis.git
cd ./ansis
npm i
npm run build
npm run bench
```

> ### Tested on
>
> MacBook Pro 16" M1 Max 64GB\
> macOS Sequoia 15.1\
> Node.js v22.11.0\
> Terminal `iTerm2` v3.5.0

---

> [!IMPORTANT]
>
> Each library uses the recommended **fastest** styling method to compare the **absolute performance**.
>
> In real practice, no one would use the **slowest** method (such as nested calls) to style a string when the library provides a **faster** and a **shorter** chained method.
>
> For example:
>
> ```js
> lib.red.bold.bgWhite(' ERROR ')           // fast and short
> lib.red(lib.bold(lib.bgWhite(' ERROR '))) // slower and verbose
> ```

<a id="bench-simple" name="bench-simple"></a>
### Simple bench

The simple test uses only single style.
Picocolors, Colorette and Kleur do not support [chained syntax](../README.md#chained-syntax) or [correct style break](../README.md#break-style-at-new-line) (wenn used ``` `\n` ``` in a string),
so they are the fastest in this simple use case. _No function, no performance overhead_.

```js
ansis.red('foo')
chalk.red('foo')
picocolors.red('foo')
styleText('red', 'foo')
...
```

```diff
+  picocolors@1.1.1    109.212.939 ops/sec
   colorette@2.0.20    108.044.800 ops/sec
   kleur@4.1.5          87.800.739 ops/sec
-> ansis@3.5.0          60.606.043 ops/sec
-  chalk@5.3.0          55.702.479 ops/sec
   kolorist@1.8.0       37.069.069 ops/sec
   ansi-colors@4.1.3    14.364.378 ops/sec
   colors@1.4.0          7.060.583 ops/sec
   cli-color@2.0.4       2.753.751 ops/sec
   colors-cli@1.0.33       897.746 ops/sec
-  styleText               579.832 ops/sec
```

<a id="bench-2-styles" name="bench-2-styles"></a>
### Using 2 styles

Using only 2 styles, picocolors is already a bit slower, because applying multiple colours at once via [chained syntax](../README.md#chained-syntax) is faster than nested calls.

```js
ansis.red.bold('foo')
chalk.red.bold('foo')
picocolors.red(picocolors.bold('foo')) // chained syntax is not supported
styleText(['red', 'bold'], 'foo')
...
```

```diff
+  ansis@3.5.0          60.468.181 ops/sec
-  picocolors@1.1.1     58.777.183 ops/sec
-  chalk@5.3.0          47.789.020 ops/sec
   colorette@2.0.20     33.387.988 ops/sec
   kolorist@1.8.0       13.420.047 ops/sec
   kleur@4.1.5           5.972.681 ops/sec
   ansi-colors@4.1.3     4.086.412 ops/sec
   colors@1.4.0          3.018.244 ops/sec
   cli-color@2.0.4       1.817.039 ops/sec
   colors-cli@1.0.33       695.601 ops/sec
-  styleText               561.290 ops/sec
```

<a id="bench-3-styles" name="bench-3-styles"></a>
### Using 3 styles

Using 3 styles, picocolors is 2x slower than ansis.

```js
ansis.red.bold.bgWhite('foo')
chalk.red.bold.bgWhite('foo')
picocolors.red(picocolors.bold(picocolors.bgWhite('foo'))) // chained syntax is not supported
styleText(['red', 'bold', 'bgWhite'], 'foo')
...
```

```diff
+  ansis@3.5.0          59.463.640 ops/sec
-  chalk@5.3.0          42.166.783 ops/sec
-  picocolors@1.1.1     32.434.017 ops/sec
   colorette@2.0.20     13.008.117 ops/sec
   kolorist@1.8.0        5.608.244 ops/sec
   kleur@4.1.5           5.268.630 ops/sec
   ansi-colors@4.1.3     2.145.517 ops/sec
   colors@1.4.0          1.686.728 ops/sec
   cli-color@2.0.4       1.453.611 ops/sec
   colors-cli@1.0.33       590.467 ops/sec
-  styleText               550.498 ops/sec
```

<a id="bench-4-styles" name="bench-4-styles"></a>
### Using 4 styles

In rare cases, when using 4 styles, picocolors becomes 3.4x slower than ansis.

```js
ansis.red.bold.underline.bgWhite('foo')
chalk.red.bold.underline.bgWhite('foo')
picocolors.red(picocolors.bold(picocolors.underline(picocolors.bgWhite('foo')))) // chained syntax is not supported
styleText(['red', 'bold', 'underline', 'bgWhite'], 'foo')
...
```

```diff
+  ansis@3.5.0          59.104.535 ops/sec
-  chalk@5.3.0          36.147.547 ops/sec
-  picocolors@1.1.1     17.581.709 ops/sec
   colorette@2.0.20      7.981.171 ops/sec
   kleur@4.1.5           4.825.665 ops/sec
   kolorist@1.8.0        3.729.880 ops/sec
   ansi-colors@4.1.3     1.514.053 ops/sec
   colors@1.4.0          1.229.999 ops/sec
   cli-color@2.0.4       1.210.931 ops/sec
   colors-cli@1.0.33       481.073 ops/sec
-  styleText               502.883 ops/sec
```

### Nested styles

```js
ansis.red(`red ${ansis.green(`green`)} red`)
chalk.red(`red ${chalk.green(`green`)} red`)
picocolors.red(`red ${picocolors.green(`green`)} red`)
styleText('red', `red ${styleText('green', 'green')} red`)
...
```

```diff
+  picocolors@1.1.1     15.146.177 ops/sec
   colorette@2.0.20     13.722.200 ops/sec
   kolorist@1.8.0        7.448.662 ops/sec
-  ansis@3.5.0           7.325.956 ops/sec
-  chalk@5.3.0           6.872.557 ops/sec
   kleur@4.1.5           6.433.848 ops/sec
   ansi-colors@4.1.3     3.921.601 ops/sec
   colors@1.4.0          2.815.078 ops/sec
   cli-color@2.0.4       1.093.307 ops/sec
   colors-cli@1.0.33       304.693 ops/sec
-  styleText               286.335 ops/sec
```

### Deeply nested styles

The complex test with deeply nested single styles.

```js
c.green(
  `green ${c.cyan(
    `cyan ${c.red(
      `red ${c.yellow(
        `yellow ${c.blue(
          `blue ${c.magenta(`magenta ${c.underline(`underline ${c.italic(`italic`)} underline`)} magenta`)} blue`,
        )} yellow`,
      )} red`,
    )} cyan`,
  )} green`,
)
```

```diff
+  colorette@2.0.20      1.110.056 ops/sec
-  picocolors@1.1.1      1.073.299 ops/sec
-> ansis@3.5.0             847.246 ops/sec
   kolorist@1.8.0          847.110 ops/sec
-  chalk@5.3.0             573.942 ops/sec
   kleur@4.1.5             471.285 ops/sec
   colors@1.4.0            439.588 ops/sec
   ansi-colors@4.1.3       382.862 ops/sec
   cli-color@2.0.4         213.351 ops/sec
   colors-cli@1.0.33        41.097 ops/sec
```

### Colorette bench

The benchmark used in [`colorette`](https://github.com/jorgebucaran/colorette/blob/main/bench/index.js) for single styles.

```js
c.red(`${c.bold(`${c.cyan(`${c.yellow('yellow')}cyan`)}`)}red`)
```

```diff
+  picocolors@1.1.1      3.861.384 ops/sec
   colorette@2.0.20      3.815.039 ops/sec
-> ansis@3.5.0           2.918.269 ops/sec
   kolorist@1.8.0        2.548.564 ops/sec
-  chalk@5.3.0           2.502.850 ops/sec
   kleur@4.1.5           2.229.023 ops/sec
   ansi-colors@4.1.3     1.426.279 ops/sec
   colors@1.4.0          1.123.139 ops/sec
   cli-color@2.0.4         481.708 ops/sec
   colors-cli@1.0.33       114.570 ops/sec
```
<a id="bench-picocolors-complex" name="bench-picocolors-complex"></a>

### Picocolors complex bench

The [`picocolors`](https://github.com/alexeyraspopov/picocolors/blob/main/benchmarks/complex.mjs) benchmark, slightly modified.
Added a bit more complexity by applying two styles to the colored word instead of one.

```js
let index = 1e8;
c.red('.') +
c.yellow('.') +
c.green('.') +
c.red.bold(' ERROR ') +
c.red('Add plugin ' + c.cyan.underline('name') + ' to use time limit with ' + c.cyan(++index));
```

```diff
+  picocolors@1.1.1      2.601.559 ops/sec
-> ansis@3.5.0           2.501.227 ops/sec
   colorette@2.0.20      2.326.491 ops/sec
-  chalk@5.3.0           2.129.106 ops/sec
   kleur@4.1.5           1.780.496 ops/sec
   kolorist@1.8.0        1.685.703 ops/sec
   ansi-colors@4.1.3       838.542 ops/sec
   colors@1.4.0            533.362 ops/sec
   cli-color@2.0.4         287.558 ops/sec
   colors-cli@1.0.33        97.463 ops/sec
```

> [!NOTE]
>
> In this test, which is closer to practical use, each library uses the **fastest** styling method available.
>
> So, `chalk`, `ansis`, `ansi-colors`, `cli-color`, `colors-cli` and `colors` uses chained method, e.g. `c.red.bold(' ERROR ')`.
> While `picocolors`, `colorette` and `kolorist` uses nested calls, e.g. `c.red(c.bold(' ERROR '))`, because doesn't support the chained syntax.