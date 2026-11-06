export function getColorSupport(stream = process.stdout) {
  if (process.env.FORCE_COLOR) return true;
  if (process.env.NO_COLOR) return false;
  if (stream && typeof stream.isTTY !== 'undefined') {
    return !!stream.isTTY;
  }
  return false;
}