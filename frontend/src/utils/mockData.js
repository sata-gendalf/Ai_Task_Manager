export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Если нужна генерация случайных задач, можно использовать, но мы её не вызываем.
export const generateMockTasks = () => {
  return [
    { id: 1, title: 'Подготовить презентацию для клиента до пятницы', status: 'active', priority: 'high', category: 'business', createdAt: new Date().toISOString() },
    { id: 2, title: 'Купить продукты', status: 'active', priority: 'medium', category: 'personal', createdAt: new Date().toISOString() },
  ];
};