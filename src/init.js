import view from './view.js';
import getId from './utils/getId.js';
import LocalStorageData from './utils/localStorageData.js';

export default () => {
  const state = {
    filter: 'all', // all / active / completed
    todos: [],
    editedTodoId: null,
  };

  const elements = {
    inputAddTodo: document.querySelector('.input-add-todo'),
    inputCheckAllTodo: document.querySelector('.todos__input-check'),
    todosList: document.querySelector('.todos__list'),
    buttonDeleteTodo: document.querySelector('.todo__button-delete'),
  };

  const localstorageTodo = new LocalStorageData('todosTestTask');

  const watchedState = view(state, elements);

  if (localstorageTodo.hasData()) {
    const { filter, todos } = localstorageTodo.getData();
    watchedState.filter = filter;
    watchedState.todos = todos;
    console.log('init!');
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

  elements.todosList.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__input-check')) {
      const { id } = event.target;
      const { checked } = event.target;
      const newTodos = watchedState.todos.reduce((acc, todo) => {
        if (Number(id) === todo.id) {
          const newStatus = checked ? 'completed' : 'active';
          const changedTodo = { ...todo, status: newStatus };
          acc.push(changedTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      watchedState.todos = newTodos;
      localstorageTodo.setData(watchedState);
    }
  });

  elements.todosList.addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__button-delete')) {
      const { id } = event.target.dataset;
      const newTodos = watchedState.todos.filter(
        (todo) => Number(id) !== todo.id
      );
      watchedState.todos = newTodos;
      localstorageTodo.setData(watchedState);
    }
  });

  elements.inputCheckAllTodo.addEventListener('click', (event) => {
    const { checked } = event.target;
    const newTodos = watchedState.todos.map((todo) => {
      const newStatus = checked ? 'completed' : 'active';
      return { ...todo, status: newStatus };
    });
    watchedState.todos = newTodos;
    localstorageTodo.setData(watchedState);
  });

  elements.todosList.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      watchedState.editedTodoId = null;
      localstorageTodo.setData(watchedState);
    }
  });

  elements.todosList.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('todo__title')) {
      const { id } = event.target.closest('.todo').dataset;
      watchedState.editedTodoId = id;
    }
    localstorageTodo.setData(watchedState);
  });

  elements.todosList.addEventListener('change', (event) => {
    event.stopPropagation();
    if (event.target.classList.contains('todo__input-editing')) {
      const { id } = event.target.closest('.todo').dataset;
      const newTodos = watchedState.todos.reduce((acc, todo) => {
        if (todo.id === Number(id)) {
          const newTodo = { ...todo, title: event.target.value };
          acc.push(newTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      watchedState.todos = newTodos;
      localstorageTodo.setData(watchedState);
    }
  });
};
