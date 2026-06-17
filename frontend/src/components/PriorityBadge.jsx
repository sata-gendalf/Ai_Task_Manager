const PriorityBadge = ({ priority }) => {
  const colors = {
    high: '#ff4444',
    medium: '#ffaa44',
    low: '#44ff44',
  };
  const label = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
  };
  return (
    <span style={{ backgroundColor: colors[priority] || '#ccc', padding: '2px 6px', borderRadius: '12px', fontSize: '12px' }}>
      {label[priority] || priority}
    </span>
  );
};

export default PriorityBadge;