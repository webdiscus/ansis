import ansis from 'ansis';

const myTheme = {
  pink: '#FF75D1',
  orange: '#FFAB40',
  apple: '#4FA83D',
};

ansis.extend(myTheme);

console.log(ansis.pink.underline('Hello'));