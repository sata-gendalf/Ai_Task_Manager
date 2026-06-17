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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Новая задача (например, «Подготовить отчёт к пятнице»)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '300px' }}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddTaskForm;