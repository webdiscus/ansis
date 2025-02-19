export const hasAnsi = (text) => {
  // check ANSI code of red
  return text.includes('[31m');
};

export const updatePageInfo = (text, error = false) => {
  document.getElementById('ansi-support').innerHTML = !error ? hasAnsi(text) ? '✅' : '❌' : '☠️';
}
