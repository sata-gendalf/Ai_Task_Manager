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
      const response = await tasksApi.createTask(title);
      const newTask = response.task || response;
      
      setTasks(prev => [newTask, ...prev]);
      
      return response;
    } catch (error) {
      console.error('Ошибка создания задачи', error);
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await tasksApi.updateTask(id, updates);
      const updatedTask = response.task || response;
      
      setTasks(prev => prev.map(task => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Ошибка обновления задачи', error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Ошибка удаления задачи', error);
      throw error;
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