import axios from 'axios';
import { BsCheckCircle, BsCircle } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const TodoListItem = ({ index, todo, todos, setTodos }) => {
  const handleDelete = async () => {
    try {
      // setTodos(todos.filter((_, i) => i !== index));

      // step 1: find the id given the index of a todo item
      const id = todos[index]._id;

      // step 2: delete this todo from the backend
      const response = await axios.delete(`http://localhost:4000/todos/${id}`);

      // step 3: if step 1 is successful, delete this todo from the frontend (state)
      if (response.status === 204)
        setTodos(todos.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoServer = async (id, completed) => {
    const response = await axios.patch(`http://localhost:4000/todos/${id}`, {
      completed: !completed,
    });
    return response.data;
  }

  // handle toggle check button
  const handleToggle = async () => {
    try {
      const id = todos[index]._id;
      const completed = todos[index].completed;

      // step 2: update this todo item in the backend
      const updatedTodoObject = await updateTodoServer(id, completed);
      // step 3: if step 2 is successful, update this todo item in the frontend (state)
      setTodos(
        todos.map((individualTodo, individualIndex) => {
          if (individualIndex === index) {
            return updatedTodoObject;
          } else {
            return individualTodo;
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  console.log(todos);

  return (
    <li style={{ position: 'relative' }}>
      <button style={{ position: 'absolute', left: 10 }} onClick={handleToggle}>
        {todo.completed ? (
          <BsCheckCircle color='green' size={25} />
        ) : (
          <BsCircle color='#e6e6e6' size={25} />
        )}
      </button>
      <label className={todo.completed && 'deleted'}>{todo.item}</label>
      <button
        style={{ position: 'absolute', right: 10 }}
        onClick={handleDelete}
      >
        <RxCross2 color='#cc9a9a' />
      </button>
    </li>
  );
};

export default TodoListItem;
