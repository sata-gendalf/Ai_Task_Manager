import { useTasks } from '../contexts/TasksContext';
import PriorityBadge from './PriorityBadge';

const formatDate = (dateString) => {
  if (!dateString) return 'Не указано';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Не указано';

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatCategory = (category) => {
  if (!category) return '—';
  const map = {
    'business': 'Работа',
    'study': 'Учёба',
    'personal': 'Личное',
    'general': 'Общее'
  };
  return map[category.toLowerCase()] || category;
};

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const toggleStatus = async () => {
    const currentStatus = task.status || 'todo';
    const newStatus = currentStatus === 'done' ? 'todo' : 'done';

    try {
      await updateTask(task.id, { status: newStatus });
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
      alert('Не удалось изменить статус задачи');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', margin: '8px 0', padding: '12px', borderRadius: '8px' }}>
      <h3>{task.title}</h3>
      <div>
        <strong>Приоритет:</strong> <PriorityBadge priority={task.priority} /><br />
        <strong>Категория:</strong> {formatCategory(task.category)}<br />
        <strong>Статус:</strong> {task.status === 'done' ? '✅ Завершена' : '🟡 В работе'}<br />
        <strong>Создана:</strong> {formatDate(task.created_at || task.createdAt)}
      </div>
      <div style={{ marginTop: '8px' }}>
        <button onClick={toggleStatus} style={{ marginRight: '8px' }}>
          {task.status === 'done' ? 'Вернуть в работу' : 'Завершить'}
        </button>
        <button 
          onClick={() => deleteTask(task.id)} 
          style={{ backgroundColor: '#ff6666', color: 'white' }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskItem;