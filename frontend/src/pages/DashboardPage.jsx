import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TasksContext';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

const DashboardPage = () => {
  const { logout } = useAuth();
  const { tasks, loading } = useTasks();

  return (
    <div>
      <h1>Мои задачи</h1>
      <button onClick={logout}>Выйти</button>
      <AddTaskForm />
      {loading && <p>Загрузка...</p>}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default DashboardPage;