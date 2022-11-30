import watcher from "./utils/watcher";

const addTodoHandler = (value, elements) => {
  elements.todosList
}

const watchedState = (state, elements) => watcher(state, (path, value) => {
  switch (path) {
    case 'filter':
      // processStateHandler(value, elements, i18next);
      break;
    case 'todos':
      // validStateHandler(value, elements);
      console.log('todos', JSON.stringify(value));
      break;
    default: break;
  }
});

export default watchedState;