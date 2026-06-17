import { useTasks } from '../contexts/TasksContext';
import PriorityBadge from './PriorityBadge';
import { formatDate } from '../utils/formatDate';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const toggleStatus = () => {
    const newStatus = task.status === 'completed' ? 'active' : 'completed';
    updateTask(task.id, { status: newStatus });
  };

  return (
    <div style={{ border: '1px solid #ddd', margin: '8px 0', padding: '12px', borderRadius: '8px' }}>
      <h3>{task.title}</h3>
      <div>
        <strong>Приоритет:</strong> <PriorityBadge priority={task.priority} /><br />
        <strong>Категория:</strong> {task.category || '—'}<br />
        <strong>Статус:</strong> {task.status === 'completed' ? '✅ Завершена' : '🟡 В работе'}<br />
        <strong>Создана:</strong> {formatDate(task.createdAt)}
      </div>
      <div style={{ marginTop: '8px' }}>
        <button onClick={toggleStatus}>
          {task.status === 'completed' ? 'Вернуть в работу' : 'Завершить'}
        </button>
        <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '8px', backgroundColor: '#ff6666' }}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskItem;