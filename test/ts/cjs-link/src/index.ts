import ansis, { link, bold, blue } from 'ansis';

const log = console.log;

log(link('https://example.com'));
log(ansis.link('https://example.com'));
log(bold.link('https://example.com', 'Click here'));
log(ansis.bold.link('https://example.com', 'Click here'));
log(blue.bold.underline.link('https://example.com', 'Click here'));