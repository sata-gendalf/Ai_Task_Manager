const CATEGORY_LABELS = {
  work: 'Работа',
  study: 'Учёба',
  personal: 'Личное',
  health: 'Здоровье',
  general: 'Общее',
};

const STATUS_LABELS = {
  todo: '📋 К выполнению',
  in_progress: '🟡 В работе',
  done: '✅ Завершена',
};

export const formatCategory = (category) => {
  if (!category) return '—';
  return CATEGORY_LABELS[category.toLowerCase()] || category;
};

export const formatStatus = (status) => {
  return STATUS_LABELS[status] || STATUS_LABELS.todo;
};

export const getNextStatus = (status) => {
  const cycle = ['todo', 'in_progress', 'done'];
  const currentIndex = cycle.indexOf(status || 'todo');
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % cycle.length;
  return cycle[nextIndex];
};

export const getStatusActionLabel = (status) => {
  if (status === 'done') return 'Вернуть';
  if (status === 'in_progress') return 'Завершить';
  return 'Начать';
};
