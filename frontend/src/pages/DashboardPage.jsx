import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TasksContext';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

const DashboardPage = () => {
  const { logout, user } = useAuth();
  const { tasks, loading } = useTasks();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Мои задачи</h1>
          {user?.email && <p className="user-email">{user.email}</p>}
        </div>
        <button onClick={logout} className="btn btn-outline">Выйти</button>
      </div>
      <AddTaskForm />
      {loading && <p>Загрузка...</p>}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default DashboardPage;