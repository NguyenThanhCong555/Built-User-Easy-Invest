export function formatCurrency(value) {
  if (value === 0) return value;
  return value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).slice(0, -1);
}
