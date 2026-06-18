import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as tasksApi from '../api/tasksApi';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await tasksApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Ошибка загрузки задач', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title) => {
    try {
      const newTask = await tasksApi.createTask(title);
      
      setTasks(prev => [newTask.task || newTask, ...prev]);
      
      return newTask;
    } catch (error) {
      console.error('Ошибка создания задачи', error);
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updated = await tasksApi.updateTask(id, updates);
      setTasks(prev => prev.map(task => (task.id === id ? (updated.task || updated) : task)));
    } catch (error) {
      console.error('Ошибка обновления задачи', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Ошибка удаления задачи', error);
    }
  };

  useEffect(() => {
    if (token) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [token]);

  return (
    <TasksContext.Provider value={{ 
      tasks, 
      loading, 
      createTask, 
      updateTask, 
      deleteTask, 
      loadTasks 
    }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used within TasksProvider');
  return context;
};