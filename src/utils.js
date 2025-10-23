// src/utils.js
export const norm = s => (s || '')
  .replace('특별자치도', '').replace('특별자치시', '').replace('특별시', '')
  .replace('광역시', '').replace('자치도', '').replace('도', '')
  .replace(/\s/g, '');

export const ALIAS = new Map([
  ['강원특별자치도', '강원'], ['제주특별자치도', '제주'], ['세종특별자치시', '세종'],
  ['충청북', '충북'], ['충청남', '충남'],
  ['경상북', '경북'], ['경상남', '경남'],
  ['전라북', '전북'], ['전라남', '전남']
]);

const lerp = (a, b, t) => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t)
];

const rgb = c => `rgb(${c[0]},${c[1]},${c[2]})`;

export const whiteToBlue = (v, min = 0, max = 100) => {
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  const from = [255, 255, 255], mid = [147, 197, 253], to = [37, 99, 235];
  const c = t < 0.5 ? lerp(from, mid, t / 0.5) : lerp(mid, to, (t - 0.5) / 0.5);
  return rgb(c);
};

export const whiteToRed = (v, min = 0, max = 100) => {
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  const from = [255, 255, 255], mid = [252, 165, 165], to = [220, 38, 38];
  const c = t < 0.5 ? lerp(from, mid, t / 0.5) : lerp(mid, to, (t - 0.5) / 0.5);
  return rgb(c);
};

export const gapPurple = (g, absMaxGap) => {
  const t = Math.max(0, Math.min(1, Math.abs(g) / absMaxGap));
  const from = [237, 233, 254], mid = [124, 58, 237], to = [76, 29, 149];
  const c = t < 0.5 ? lerp(from, mid, t / 0.5) : lerp(mid, to, (t - 0.5) / 0.5);
  return rgb(c);
};

const median = arr => {
  const a = [...arr].filter(n => typeof n === 'number').sort((x, y) => x - y);
  const n = a.length;
  return !n ? 70 : (n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2);
};

export const baselineFrom = (DATA) => {
  const polMed = median(DATA.map(d => d.policy));
  const psyMed = median(DATA.map(d => d.psychology));
  const keys = new Set();
  DATA.forEach(d => Object.keys(d.themes || {}).forEach(k => keys.add(k)));
  const themeObj = {};
  keys.forEach(k => {
    themeObj[k] = median(DATA.map(d => (d.themes || {})[k]));
    if (Number.isNaN(themeObj[k])) themeObj[k] = 70;
  });
  return { polMed, psyMed, themeObj };
};
