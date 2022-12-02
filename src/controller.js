import getId from './utils/getId.js';

export default (model, elements, localStorageHandler) => {
  elements.inputAddTodo().addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      const newTodo = {
        title: event.target.value,
        status: 'active',
        id: getId(),
      };
      const newTodos = [...model.todos.items, newTodo];
      model.todos = {
        filter: model.todos.filter,
        items: newTodos,
      };
      localStorageHandler.setData(model.todos);
      event.target.value = '';
    }
  });

  elements.todosList().addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__input-check')) {
      const { id } = event.target;
      const { checked } = event.target;
      const newTodos = model.todos.items.reduce((acc, todo) => {
        if (Number(id) === todo.id) {
          const newStatus = checked ? 'completed' : 'active';
          const changedTodo = { ...todo, status: newStatus };
          acc.push(changedTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      model.todos = {
        filter: model.todos.filter,
        items: newTodos,
      };
      localStorageHandler.setData(model.todos);
    }
  });

  elements.todosList().addEventListener('click', (event) => {
    if (event.target.classList.contains('todo__button-delete')) {
      const { id } = event.target.dataset;
      const newTodos = model.todos.items.filter(
        (todo) => Number(id) !== todo.id
      );
      model.todos = {
        filter: model.todos.filter,
        items: newTodos,
      };
      localStorageHandler.setData(model.todos);
    }
  });

  elements.inputCheckAllTodo().addEventListener('click', (event) => {
    const { checked } = event.target;
    const newTodos = model.todos.items.map((todo) => {
      const newStatus = checked ? 'completed' : 'active';
      return { ...todo, status: newStatus };
    });
    model.todos = {
      filter: model.todos.filter,
      items: newTodos,
    };
    localStorageHandler.setData(model.todos);
  });

  elements.todosList().addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('todo__title')) {
      const { id } = event.target.closest('.todo').dataset;
      model.editedTodoId = id;
    }
    localStorageHandler.setData(model.todos);
  });

  elements.todosList().addEventListener('focusout', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      model.editedTodoId = null;
      localStorageHandler.setData(model.todos);
    }
  });

  elements.todosList().addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      if (event.target.classList.contains('todo__input-editing')) {
        model.editedTodoId = null;
        localStorageHandler.setData(model.todos);
      }
    }
  });

  elements.todosList().addEventListener('change', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      const { id } = event.target.closest('.todo').dataset;
      const newTodos = model.todos.items.reduce((acc, todo) => {
        if (todo.id === Number(id)) {
          const newTodo = { ...todo, title: event.target.value };
          acc.push(newTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      model.todos = {
        filter: model.todos.filter,
        items: newTodos,
      };
      localStorageHandler.setData(model.todos);
    }
  });

  elements.filterList().addEventListener('change', (event) => {
    const filter = event.target.value;
    model.todos = {
      filter,
      items: model.todos.items,
    };
    localStorageHandler.setData(model.todos);
  });

  elements.buttonClearCompleted().addEventListener('click', () => {
    const activeTodos = model.todos.items.filter((todo) => todo.status === 'active');
    model.todos = {
      filter: model.todos.filter,
      items: activeTodos,
    };
    localStorageHandler.setData(model.todos);
  });
};
