import watcher from "./utils/watcher";
import renderTodos, { renderEditedTodo } from "./view";

export default (state, elements) =>
  watcher(state, (path, value) => {
    switch (path) {
      case 'todos':
        renderTodos(value, elements);
        break;
      case 'editedTodoId':
        renderEditedTodo(value, elements);
        break;
      default:
        break;
    }
  });
