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
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <PriorityBadge priority={task.priority} />
      </div>
      <div className="task-meta">
        <span>Категория: {task.category || '—'}</span>
        <span>Статус: {task.status === 'completed' ? '✅ Завершена' : '🟡 В работе'}</span>
        <span>Создана: {formatDate(task.createdAt)}</span>
      </div>
      <div className="task-actions">
        <button onClick={toggleStatus} className="btn btn-outline">
          {task.status === 'completed' ? 'Вернуть' : 'Завершить'}
        </button>
        <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Удалить</button>
      </div>
    </div>
  );
};

export default TaskItem;