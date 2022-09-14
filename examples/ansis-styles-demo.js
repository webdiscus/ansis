import {
  bgBlue,
  bgBlueBright,
  black,
  blue, blueBright,
  cyan, cyanBright,
  dim, gray,
  green, greenBright,
  bold,
  inverse,
  italic,
  magenta, magentaBright,
  red, redBright,
  strikethrough,
  underline,
  white, whiteBright,
  yellow, yellowBright,
} from '../src/colors.mjs';

const out = bold(' bold') +
  dim(' dim') +
  italic(' italic ') +
  underline('underline') +
  ' ' +
  strikethrough('strikethrough') +
  ' ' +
  inverse('inverse') +
  ' ' +
  bold.italic.underline.strike(' bold italic underline strike ') +
  red('\n red') +
  green(' green') +
  yellow(' yellow') +
  blue(' blue') +
  magenta(' magenta') +
  cyan(' cyan') +
  white(' white') +
  gray(' gray') +
  bold.yellow(' bold yellow ') +
  dim.cyan('faint cyan ') +
  redBright('redBright\n ') +
  black.bgRed('bgRed') +
  ' ' +
  black.bgGreen('bgGreen') +
  ' ' +
  black.bgYellow('bgYellow') +
  ' ' +
  bgBlue('bgBlue') +
  ' ' +
  black.bgMagenta('bgMagenta') +
  ' ' +
  black.bgCyan('bgCyan') +
  ' ' +
  black.bgWhite('bgWhite') +
  ' ' +
  white.bgRed.bold.italic.strikethrough(' Coca Cola ') +
  ' ' +
  black.bgRedBright('bgRedBright\n') +
  greenBright(' greenBright') +
  yellowBright(' yellowBright') +
  blueBright(' blueBright') +
  magentaBright(' magentaBright') +
  cyanBright(' cyanBright') +
  whiteBright(' whiteBright') +
  greenBright(' A') +
  magentaBright('N') +
  yellowBright('S') +
  redBright('I') +
  blueBright('S\n ') +
  black.bgGreenBright('bgGreenBright') +
  ' ' +
  black.bgYellowBright('bgYellowBright') +
  ' ' +
  bgBlueBright('bgBlueBright') +
  ' ' +
  black.bgMagentaBright('bgMagentaBright') +
  ' ' +
  black.bgCyanBright('bgCyanBright') +
  ' ' +
  black.bgWhiteBright(' ') +
  ' ' +
  magentaBright.bgGreenBright('A') +
  blueBright.bgMagentaBright('N') +
  redBright.bgYellowBright('S') +
  yellowBright.bgRedBright('I') +
  redBright.bgBlueBright('S') +
  '\n ' +
  [
    '#d93611',
    '#d97511',
    '#d9d611',
    '#a0d911',
    '#18d911',
    '#11d9c2',
    '#119dd9',
    '#1157d9',
    '#6614f6',
    '#c511d9',
    '#f10794',
  ].reduce((out, hex) => out + black.hex(hex)(hex), '') +
  '\n ' +
  [
    ' 197 ',
    ' 203 ',
    ' 209 ',
    ' 215 ',
    ' 221 ',
    ' 227 ',
    ' 191 ',
    ' 156  ',
    ' 120  ',
    ' 123 ',
    ' 117 ',
    ' 147 ',
    ' 141 ',
    '  98 ',
    '  92 ',
  ].reduce((out, code) => out + black.bgAnsi(parseInt(code, 10))(code), '') +
  '\n ';

export { out as ansisStylesDemo };
