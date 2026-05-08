export function formatCurrencyPHP(amount) {
  const num = Number(amount);
  const safe = Number.isFinite(num) ? num : 0;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe);
}

export default formatCurrencyPHP;
