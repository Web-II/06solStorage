const ONE_DAY = 24 * 60 * 60 * 1000;
export function calculateDiffDays(d1, d2 = new Date()) {
  d1 = new Date(d1);
  d2 = new Date(d2);
  const d1OnlyDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const d2OnlyDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((d1OnlyDate - d2OnlyDate) / ONE_DAY);
}
