import ansis from 'ansis';
import chalk from 'chalk';
import pico from 'picocolors';

console.log('\n** Ansis **');
console.log(ansis.gray.underline('-> ' + ansis.blue('my-app') + ' ' + ansis.green('production')));
console.log(ansis.gray.underline`-> ${ansis.blue('my-app')} ${ansis.green('production')}`);
console.log(ansis.underline(ansis.gray`-> ${ansis.blue('my-app')} ${ansis.green('production')}`));

console.log('\n** Chalk **');
console.log(chalk.gray.underline('-> ' + chalk.blue('my-app') + ' ' + chalk.green('production')));
console.log(chalk.gray.underline`-> ${chalk.blue('my-app')} ${chalk.green('production')}`);
console.log(chalk.underline(chalk.gray`-> ${chalk.blue('my-app')} ${chalk.green('production')}`));

console.log('\n** Picocolors **');
console.log(pico.underline(pico.gray('-> ' + pico.blue('my-app') + ' ' + pico.green('production'))));
