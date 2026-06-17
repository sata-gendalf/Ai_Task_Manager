import { delay, generateMockTasks } from '../utils/mockData';

// Временное хранилище задач в памяти (для демонстрации)
let mockTasks = [];

// Функция для генерации начальных задач (если пусто)
const getInitialTasks = () => {
  if (mockTasks.length === 0) {
    mockTasks = [
      { id: 1, title: 'Подготовить презентацию для клиента до пятницы', status: 'active', priority: 'high', category: 'business', createdAt: new Date().toISOString() },
      { id: 2, title: 'Купить продукты', status: 'active', priority: 'medium', category: 'personal', createdAt: new Date().toISOString() },
      { id: 3, title: 'Изучить React хуки', status: 'completed', priority: 'low', category: 'study', createdAt: new Date().toISOString() },
    ];
  }
  return mockTasks;
};

export const getTasks = async () => {
  await delay(300);
  return [...getInitialTasks()];
};

export const createTask = async (title) => {
  await delay(500);
  // Имитация анализа текста (простые правила)
  let priority = 'medium';
  let category = 'general';
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('срочно') || lowerTitle.includes('важно') || lowerTitle.includes('дедлайн')) {
    priority = 'high';
  } else if (lowerTitle.includes('мелкий') || lowerTitle.includes('необязательно')) {
    priority = 'low';
  }
  if (lowerTitle.includes('отчёт') || lowerTitle.includes('клиент') || lowerTitle.includes('встреча')) {
    category = 'business';
  } else if (lowerTitle.includes('купить') || lowerTitle.includes('дома')) {
    category = 'personal';
  } else if (lowerTitle.includes('учить') || lowerTitle.includes('курс')) {
    category = 'study';
  }

  const newTask = {
    id: Date.now(),
    title,
    status: 'active',
    priority,
    category,
    createdAt: new Date().toISOString()
  };
  mockTasks.unshift(newTask);
  return newTask;
};

export const updateTask = async (id, updates) => {
  await delay(400);
  const index = mockTasks.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTasks[index] = { ...mockTasks[index], ...updates };
    return mockTasks[index];
  }
  throw new Error('Task not found');
};

export const deleteTask = async (id) => {
  await delay(300);
  mockTasks = mockTasks.filter(t => t.id !== id);
};