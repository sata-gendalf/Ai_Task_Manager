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