import ansis, { link, bold, blue } from 'ansis';

const log = console.log;

log(link('https://example.com'));
log(ansis.link('https://example.com'));
log(bold.link('Click here', 'https://example.com'));
log(ansis.bold.link('Click here', 'https://example.com'));
log(blue.bold.underline.link('Click here', 'https://example.com'));
