import view from "./view.js";
import getId from './utils/getId.js'

export default () => {
  const state = {
    filter: 'all', // all / active / completed
    todos: [],
  };

  const elements = {
    inputAddTodo: document.querySelector('.input-add-todo'),
    todosList: document.querySelector('.todos__list'),
  };

  const watchedState = view(state, elements);

  elements.inputAddTodo.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const newTodo = { title: event.target.value, status: 'active', id: getId() };
      const todos = [...watchedState.todos, newTodo];
      watchedState.todos = todos;
      event.target.value = '';
    }
  });
};
