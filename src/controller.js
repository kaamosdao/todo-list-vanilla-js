import getId from './utils/getId.js';

export default (model, elements, localStorageHandler) => {
  elements.inputAddTodo.addEventListener('keyup', (event) => {
    event.preventDefault();
    const todoTitle = event.target.value.trim();
    if (event.keyCode === 13) {
      if (!todoTitle) {
        return;
      }
      const newTodo = {
        title: todoTitle,
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

  document.addEventListener('click', (event) => {
    const todoTitle = elements.inputAddTodo.value.trim();
    if (event.target.classList.contains('input-add-todo')) {
      return;
    }
    if (!todoTitle) {
      return;
    }
    const newTodo = {
      title: todoTitle,
      status: 'active',
      id: getId(),
    };
    const newTodos = [...model.todos.items, newTodo];
    model.todos = {
      filter: model.todos.filter,
      items: newTodos,
    };
    localStorageHandler.setData(model.todos);
    elements.inputAddTodo.value = '';
  });

  elements.todosList.addEventListener('click', (event) => {
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

  elements.todosList.addEventListener('click', (event) => {
    if (elements.inputAddTodo.value) {
      return;
    }
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

  elements.inputCheckAllTodo.addEventListener('click', (event) => {
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

  elements.todosList.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('todo__title')) {
      const { id } = event.target.closest('.todo').dataset;
      model.editedTodoId = id;
    }
    localStorageHandler.setData(model.todos);
  });

  elements.todosList.addEventListener('focusout', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      model.editedTodoId = null;
      localStorageHandler.setData(model.todos);
    }
  });

  elements.todosList.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      if (event.target.classList.contains('todo__input-editing')) {
        model.editedTodoId = null;
        localStorageHandler.setData(model.todos);
      }
    }
  });

  elements.todosList.addEventListener('change', (event) => {
    if (event.target.classList.contains('todo__input-editing')) {
      const { id } = event.target.closest('.todo').dataset;
      const newTodos = model.todos.items.reduce((acc, todo) => {
        if (todo.id === Number(id)) {
          const todoTitle = event.target.value.trim();
          const newTodo = { ...todo, title: todoTitle };
          acc.push(newTodo);
        } else {
          acc.push(todo);
        }
        return acc;
      }, []);
      const clearedTodos = newTodos.filter((todo) => todo.title);
      model.todos = {
        filter: model.todos.filter,
        items: clearedTodos,
      };
      localStorageHandler.setData(model.todos);
    }
  });

  elements.filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (elements.inputAddTodo.value) {
        return;
      }
      const filter = event.target.name;
      model.todos = {
        filter,
        items: model.todos.items,
      };
      localStorageHandler.setData(model.todos);
    });
  });

  elements.buttonClearCompleted.addEventListener('click', () => {
    if (elements.inputAddTodo.value) {
      return;
    }
    const activeTodos = model.todos.items.filter(
      (todo) => todo.status === 'active'
    );
    model.todos = {
      filter: model.todos.filter,
      items: activeTodos,
    };
    localStorageHandler.setData(model.todos);
  });
};
