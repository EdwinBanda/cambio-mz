export function formatNumber(value, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('pt-MZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value)
}

export function formatDate(value) {
  if (!value || Number.isNaN(new Date(value).getTime())) return 'Hora indisponível'
  return new Intl.DateTimeFormat('pt-MZ', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}
