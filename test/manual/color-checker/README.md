# Color Checker

Manual color support checker for ansis.

Run it in different terminals, shells, process managers, and runtimes to inspect the environment values used by ansis color detection and visually check whether ANSI colors render correctly.

## Usage

From this and root project directory:

```sh
npm run color-checker
```

## Examples

From this and root project directory:

```sh
TERM=dumb COLORTERM=truecolor npm run color-checker # no color
NO_COLOR=1 npm run color-checker                    # no color
COLORTERM=ansi256 npm run color-checker             # 256 colors
FORCE_COLOR=3 npm run color-checker                 # truecolor
```
