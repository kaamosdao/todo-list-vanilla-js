const createTodoCheckElement = (todo) => {
  const inputCheckTodo = document.createElement('input');
  inputCheckTodo.classList.add('visually-hidden', 'todo__input-check');
  inputCheckTodo.type = 'checkbox';
  inputCheckTodo.setAttribute('id', String(todo.id));

  if (todo.status === 'completed') {
    inputCheckTodo.checked = true;
  }

  const todoCheckbox = document.createElement('label');
  todoCheckbox.classList.add('todo__checkbox');
  todoCheckbox.append(inputCheckTodo);
  const spanMarkElement = document.createElement('span');
  spanMarkElement.classList.add('todo__checkbox-mark');
  todoCheckbox.append(spanMarkElement);

  return todoCheckbox;
};

const createTodoElement = (todo) => {
  const todoCheckbox = createTodoCheckElement(todo);

  const todoTitle = document.createElement('p');
  todoTitle.classList.add('todo__title');
  todoTitle.textContent = todo.title;

  const buttonDeleteTodo = document.createElement('button');
  buttonDeleteTodo.classList.add('todo__button-delete');
  buttonDeleteTodo.setAttribute('type', 'button');
  buttonDeleteTodo.dataset.id = todo.id;

  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo__container');

  todoContainer.append(todoCheckbox);
  todoContainer.append(todoTitle);
  todoContainer.append(buttonDeleteTodo);

  const todoItem = document.createElement('li');
  todoItem.classList.add('todos__item', 'todo');
  todoItem.dataset.id = String(todo.id);
  todoItem.append(todoContainer);

  if (todo.status === 'completed') {
    todoItem.classList.add('todo--completed');
  }

  return todoItem;
};

const renderTodoCounter = (todos, elements) => {
  const todosCounterInfo = elements.spanTodoInfo();
  todosCounterInfo.innerHTML = '';
  const activeTodosCount = todos.filter((todo) => todo.status === 'active').length;
  const todosCountElement = document.createElement('strong');
  todosCountElement.classList.add('todo-header__count');
  todosCountElement.textContent = activeTodosCount;
  todosCounterInfo.append(todosCountElement);

  if (activeTodosCount === 1) {
    todosCounterInfo.append(' item left');
  } else {
    todosCounterInfo.append(' items left');
  }
};

const renderAppearingElements = (todos, elements) => {
  const hasTodos = todos.length;
  const hasCompletedTodos = todos.find((todo) => todo.status === 'completed');

  if (hasTodos) {
    elements.checkboxAllTodo().classList.remove('todos__check-all--hide');
    elements.todoHeader().classList.remove('todo-header--hide');
  } else {
    elements.checkboxAllTodo().classList.add('todos__check-all--hide');
    elements.todoHeader().classList.add('todo-header--hide');
  }

  if (hasCompletedTodos) {
    elements.buttonClearCompleted.classList.remove('todo-header--hide');
  } else {
    elements.buttonClearCompleted.classList.add('todo-header--hide');
  }
};

const renderCheckAllTodo = (todos, elements) => {
  const hasActiveTodo = todos.find((todo) => todo.status === 'active');

  if (!hasActiveTodo) {
    elements.inputCheckAllTodo.checked = true;
  } else {
    elements.inputCheckAllTodo.checked = false;
  }
};

const filterTodos = (todos, filter) => {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
};

const renderFilterdTodoItems = (todos, filter, elements) => {
  const filteredTodos = filterTodos(todos, filter);

  filteredTodos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    elements.todosList.append(todoElement);
  });
};

const renderFilterView = (filter, elements) => {
  elements.filterButtons.forEach((button) => {
    if (button.name === filter) {
      button.classList.add('button-filter--selected');
    } else {
      button.classList.remove('button-filter--selected');
    }
  });
};

const renderTodos = (todos, elements) => {
  elements.todosList.innerHTML = '';

  renderAppearingElements(todos.items, elements);
  renderCheckAllTodo(todos.items, elements);
  renderFilterdTodoItems(todos.items, todos.filter, elements);
  renderFilterView(todos.filter, elements);
  renderTodoCounter(todos.items, elements);
};

export const renderEditedTodo = (editedTodoId, elements) => {
  if (!editedTodoId) {
    elements.editingTodo().classList.remove('todo--editing');
    elements.editingInput().remove();
    return;
  }

  const editedTodoInput = document.createElement('input');
  editedTodoInput.classList.add('todo__input-editing');
  editedTodoInput.setAttribute('type', 'text');
  const currentTodoItem = document.querySelector(`.todo[data-id="${editedTodoId}"]`);
  editedTodoInput.value = currentTodoItem.textContent;
  currentTodoItem.append(editedTodoInput);
  currentTodoItem.classList.add('todo--editing');
  editedTodoInput.focus();
};

export default renderTodos;
