import { bgGreen, red } from 'kolorist';

let label = (text) => bgGreen(text);

console.log(label(` Kolorist `) + red(` Red`));
