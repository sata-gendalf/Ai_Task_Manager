import { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { createTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Введите текст задачи');
      return;
    }

    try {
      await createTask(title);
      setTitle('');
    } catch (err) {
      setError(err.message || 'Ошибка при создании задачи');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Новая задача (например, «Подготовить отчёт к пятнице»)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">Добавить</button>
      </form>
      {error && <p className="error" style={{ marginBottom: '20px' }}>{error}</p>}
    </div>
  );
};

export default AddTaskForm;