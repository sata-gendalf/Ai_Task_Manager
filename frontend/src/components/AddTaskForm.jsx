import { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const { createTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask(title);
    setTitle('');
  };

  return (
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
  );
};

export default AddTaskForm;