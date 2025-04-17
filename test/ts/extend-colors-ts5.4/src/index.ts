import ansis, { Ansis } from 'ansis';

const myTheme = {
  pink: '#FF75D1',
  orange: '#FFAB40',
  apple: '#4FA83D',
};

// ✅ Default instance
const themed = ansis.extend(myTheme);
console.log(themed.red.bold('Red')); // test base color
console.log(themed.apple.bold('Apple')); // test extended color

// ✅ Inline
const themed2 = new Ansis(2).extend(myTheme); // test fallback to 256 colors in extended palette
console.log(themed2.red('Red'));
console.log(themed2.orange.bold('Orange256'));

const { pink, red } = themed2;
console.log(red('Red'));
console.log(pink.bold('Pink256'));

// ❌ Override
// TypeScript doesn’t widen the variable's type after assignment. This is the limitation.
// Solution: use inline definition, see above.

// let themed3 = new Ansis();
// themed3 = themed3.extend(myTheme); // override doesn't works
// console.log(themed3.red.bold('Red')); // ✅ works properly
// console.log(themed3.pink.bold('Pink')); // ❌ TS2339: Property 'pink' does not exist on type A

// ❌ Old version < v4: Did not work with newly created instances:
// const ansis = new Ansis();
// ansis.extend({ pink: '#FF75D1' }); // TS2775: Assertions require every name in the call target to be declared with an explicit type annotation.
// console.log(ansis.pink('Hello')); // TS2339: Property 'pink' does not exist