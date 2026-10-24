export function formatCurrency(value: number | string) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatDate(date: string) {
  const datePart = date.slice(0, 10);
  const [year, month, day] = datePart.split('-');

  return `${day}/${month}/${year}`;
}
