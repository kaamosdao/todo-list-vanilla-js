import view from './view.js';
import getId from './utils/getId.js';
import LocalStorageData from './utils/localStorageData.js';

export default () => {
  const state = {
    todos: {
      filter: 'all',
      items: [],
    },
    editedTodoId: null,
  };

  const elements = {
    inputAddTodo: () => document.querySelector('.input-add-todo'),
    inputCheckAllTodo: () => document.querySelector('.todos__input-check'),
    todosList: () => document.querySelector('.todos__list'),
    buttonDeleteTodo: () => document.querySelector('.todo__button-delete'),
    filterList: () => document.querySelector('.todo-header__filter__list'),
    checkboxAllTodo: () => document.querySelector('.todos__check-all'),
    todoHeader: () => document.querySelector('.todo-header'),
    editingTodo: () => document.querySelector(`.todo--editing`),
    editingInput: () => document.querySelector(`.todo__input-editing`),
  };

  const localstorageTodo = new LocalStorageData('todosTestTask');

  const watchedState = view(state, elements);

  if (localstorageTodo.hasData()) {
    const todos = localstorageTodo.getData();
    watchedState.todos = todos;
  }

  elements.inputAddTodo().addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const newTodo = {
        title: event.target.value,
        status: 'active',
        id: getId(),
      };
      const newTodos = [...watchedState.todos.items, newTodo];
      watchedState.todos = {
        filter: watchedState.todos.filter,
        items: newTodos,
      };
      localstorageTodo.setData(watchedState.todos);
      event.target.value = '';
    }
  });

  elements.todosList().addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__input-check')) {
      const { id } = event.target;
      const { checked } = event.target;
      const newTodos = watchedState.todos.items.reduce((acc, todo) => {
        if (Number(id) === todo.id) {
          const newStatus = checked ? 'completed' : 'active';
          const changedTodo = { ...todo, status: newStatus };
          acc.push(changedTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      watchedState.todos = {
        filter: watchedState.todos.filter,
        items: newTodos,
      };
      localstorageTodo.setData(watchedState.todos);
    }
  });

  elements.todosList().addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__button-delete')) {
      const { id } = event.target.dataset;
      const newTodos = watchedState.todos.items.filter(
        (todo) => Number(id) !== todo.id
      );
      watchedState.todos = {
        filter: watchedState.todos.filter,
        items: newTodos,
      };
      localstorageTodo.setData(watchedState.todos);
    }
  });

  elements.inputCheckAllTodo().addEventListener('click', (event) => {
    const { checked } = event.target;
    const newTodos = watchedState.todos.items.map((todo) => {
      const newStatus = checked ? 'completed' : 'active';
      return { ...todo, status: newStatus };
    });
    watchedState.todos = {
      filter: watchedState.todos.filter,
      items: newTodos,
    };
    localstorageTodo.setData(watchedState.todos);
  });

  elements.todosList().addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('todo__title')) {
      const { id } = event.target.closest('.todo').dataset;
      watchedState.editedTodoId = id;
    }
    localstorageTodo.setData(watchedState.todos);
  });

  elements.todosList().addEventListener('focusout', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      watchedState.editedTodoId = null;
      localstorageTodo.setData(watchedState.todos);
    }
  });

  elements.todosList().addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      if (event.target.classList.contains('todo__input-editing')) {
        watchedState.editedTodoId = null;
        localstorageTodo.setData(watchedState.todos);
      }
    }
  });

  elements.todosList().addEventListener('change', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      const { id } = event.target.closest('.todo').dataset;
      const newTodos = watchedState.todos.items.reduce((acc, todo) => {
        if (todo.id === Number(id)) {
          const newTodo = { ...todo, title: event.target.value };
          acc.push(newTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      watchedState.todos = {
        filter: watchedState.todos.filter,
        items: newTodos,
      };
      localstorageTodo.setData(watchedState.todos);
    }
  });

  elements.filterList().addEventListener('change', (event) => {
    const filter = event.target.value;
    watchedState.todos = {
      filter,
      items: watchedState.todos.items,
    };
    localstorageTodo.setData(watchedState.todos);
  });
};
