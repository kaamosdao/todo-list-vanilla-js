import watchedState from './model.js';
import LocalStorageData from './utils/localStorageData.js';
import setControllers from './controller.js';

export default () => {
  const state = {
    todos: {
      filter: 'all',
      items: [],
    },
    editedTodoId: null,
  };

  const elements = {
    inputAddTodo: document.querySelector('.input-add-todo'),
    inputCheckAllTodo: document.querySelector('.todos__input-check'),
    todosList: document.querySelector('.todos__list'),
    filterButtons: document.querySelectorAll('.button-filter'),
    buttonClearCompleted: document.querySelector(`.todo-header__button-clear`),
    buttonDeleteTodo: () => document.querySelector('.todo__button-delete'),
    checkboxAllTodo: () => document.querySelector('.todos__check-all'),
    todoHeader: () => document.querySelector('.todo-header'),
    editingTodo: () => document.querySelector(`.todo--editing`),
    editingInput: () => document.querySelector(`.todo__input-editing`),
    spanTodoInfo: () => document.querySelector(`.todo-header__info`),
  };

  const localStorageTodo = new LocalStorageData('todosTestTask');

  const model = watchedState(state, elements);

  if (localStorageTodo.hasData()) {
    const todos = localStorageTodo.getData();
    model.todos = todos;
  }

  setControllers(model, elements, localStorageTodo);

  elements.inputAddTodo.focus();
};
