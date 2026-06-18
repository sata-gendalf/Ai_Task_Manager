const PriorityBadge = ({ priority }) => {
  const classMap = {
    high: 'badge-high',
    medium: 'badge-medium',
    low: 'badge-low',
  };
  const labelMap = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
  };
  return (
    <span className={`badge ${classMap[priority] || 'badge-medium'}`}>
      {labelMap[priority] || priority || 'Средний'}
    </span>
  );
};

export default PriorityBadge;