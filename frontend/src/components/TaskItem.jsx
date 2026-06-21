import { useTasks } from '../contexts/TasksContext';
import PriorityBadge from './PriorityBadge';
import { formatDate } from '../utils/formatDate';
import {
  formatCategory,
  formatStatus,
  getNextStatus,
  getStatusActionLabel,
} from '../utils/taskLabels';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();

  const toggleStatus = async () => {
    const currentStatus = task.status || 'todo';
    const newStatus = getNextStatus(currentStatus);

    try {
      await updateTask(task.id, { status: newStatus });
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
      alert(error.message || 'Не удалось изменить статус задачи');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены что хотите удалить эту задачу?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Ошибка при удалении:', error);
        alert(error.message || 'Не удалось удалить задачу');
      }
    }
  };

  return (
    <div className={`task-item ${task.status === 'done' ? 'completed' : ''}`}>
      <div className="task-header">
        <span className="task-title">{task.title}</span>
        <PriorityBadge priority={task.priority} />
      </div>
      <div className="task-meta">
        <span>Категория: {formatCategory(task.category)}</span>
        <span>Статус: {formatStatus(task.status)}</span>
        <span>Создана: {formatDate(task.created_at)}</span>
      </div>
      <div className="task-actions">
        <button onClick={toggleStatus} className="btn btn-outline">
          {getStatusActionLabel(task.status)}
        </button>
        <button onClick={handleDelete} className="btn btn-danger">Удалить</button>
      </div>
    </div>
  );
};

export default TaskItem;
