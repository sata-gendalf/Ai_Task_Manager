export const formatDate = (dateString) => {
  if (!dateString) return 'Не указано';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Не указано';

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
