// ansis detects color level automaticaly by import once
import ansis from 'ansis';

// the cli app used ansis
function color(text) {
  return ansis.hex('#00c200')(text);
}

export default {
  color,
};