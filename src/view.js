const createTodoCheckElement = (todo) => {
  const inputCheckElement = document.createElement('input');
  inputCheckElement.classList.add('visually-hidden', 'todo__input-check');
  inputCheckElement.type = 'checkbox';
  inputCheckElement.setAttribute('id', String(todo.id));

  if (todo.status === 'completed') {
    inputCheckElement.checked = true;
  }

  const labelElement = document.createElement('label');
  labelElement.classList.add('todo__checkbox');
  labelElement.append(inputCheckElement);
  const spanMarkElement = document.createElement('span');
  spanMarkElement.classList.add('todo__checkbox-mark');
  labelElement.append(spanMarkElement);

  return labelElement;
};

const createTodoElement = (todo) => {
  const todoCheckElement = createTodoCheckElement(todo);

  const pElement = document.createElement('p');
  pElement.classList.add('todo__title');
  pElement.textContent = todo.title;

  const buttonElement = document.createElement('button');
  buttonElement.classList.add('todo__button-delete');
  buttonElement.setAttribute('type', 'button');
  buttonElement.dataset.id = todo.id;

  const divElement = document.createElement('div');
  divElement.classList.add('todo__container');

  divElement.append(todoCheckElement);
  divElement.append(pElement);
  divElement.append(buttonElement);

  const liElement = document.createElement('li');
  liElement.classList.add('todos__item', 'todo');
  liElement.dataset.id = String(todo.id);
  liElement.append(divElement);

  if (todo.status === 'completed') {
    liElement.classList.add('todo--completed');
  }

  return liElement;
};

const renderTodoCounter = (todos, elements) => {
  const spanElement = elements.spanTodoInfo();
  spanElement.innerHTML = '';
  const activeTodosCount = todos.filter(
    (todo) => todo.status === 'active'
  ).length;
  const strongElement = document.createElement('strong');
  strongElement.classList.add('todo-header__count');
  strongElement.textContent = activeTodosCount;
  spanElement.append(strongElement);

  if (activeTodosCount === 1) {
    spanElement.append(' item left');
  } else {
    spanElement.append(' items left');
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

const renderInputCheckAllTodo = (todos, elements) => {
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

const renderEachTodo = (todos, filter, elements) => {
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
  renderInputCheckAllTodo(todos.items, elements);
  renderEachTodo(todos.items, todos.filter, elements);
  renderFilterView(todos.filter, elements);
  renderTodoCounter(todos.items, elements);
};

export const renderEditedTodo = (editedTodoId, elements) => {
  if (!editedTodoId) {
    elements.editingTodo().classList.remove('todo--editing');
    elements.editingInput().remove();
    return;
  }

  const inputElement = document.createElement('input');
  inputElement.classList.add('todo__input-editing');
  inputElement.setAttribute('type', 'text');
  const liElement = document.querySelector(`.todo[data-id="${editedTodoId}"]`);
  inputElement.value = liElement.textContent;
  liElement.append(inputElement);
  liElement.classList.add('todo--editing');
  inputElement.focus();
};

export default renderTodos;
