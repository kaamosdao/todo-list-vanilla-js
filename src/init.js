import view from './view.js';
import getId from './utils/getId.js';
import LocalStorageData from './utils/localStorageData.js';

export default () => {
  const state = {
    filter: 'all', // all / active / completed
    todos: [],
  };

  const elements = {
    inputAddTodo: document.querySelector('.input-add-todo'),
    todosList: document.querySelector('.todos__list'),
  };

  const localstorageTodo = new LocalStorageData('todosTestTask');

  const watchedState = view(state, elements);

  if (localstorageTodo.hasData()) {
    const { filter, todos } = localstorageTodo.getData();
    watchedState.filter = filter;
    watchedState.todos = todos;
    console.log('init!')
  }

  elements.inputAddTodo.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const newTodo = {
        title: event.target.value,
        status: 'active',
        id: getId(),
      };
      const todos = [...watchedState.todos, newTodo];
      watchedState.todos = todos;
      localstorageTodo.setData(watchedState);
      event.target.value = '';
    }
  });
};
