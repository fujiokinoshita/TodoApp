export const Todo = (props) => {
  const handleDeleteClick = () => {
    props.onDeleteClick(props.todo.id);
  };

  const handleCheckboxChange = () => {
    props.onCheckboxChange(props.todo.id);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={props.todo.isCompleted}
          onChange={handleCheckboxChange}
        />
        <span>{props.todo.title}</span>
      </label>
      <button onClick={handleDeleteClick}>Del</button>
    </li>
  );
};
