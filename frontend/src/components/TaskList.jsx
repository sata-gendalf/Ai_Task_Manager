import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>У вас пока нет задач. Создайте первую!</p>;
  }
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;