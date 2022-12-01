import watcher from './utils/watcher';

const addTodoHandler = (value, elements) => {
  elements.todosList.innerHTML = '';
  const hasActiveTodo = value.filter((todo) => todo.status === 'active').length;
  const hasTodos = value.length;
  
  const checkboxAllTodo = document.querySelector('.todos__check-all');

  if (!hasTodos) {
    checkboxAllTodo.classList.add('todos__check-all--hide');
  } else {
    checkboxAllTodo.classList.remove('todos__check-all--hide');
  }
  
  const inputCheckAllTodo = document.querySelector('.todos__input-check');
  if (!hasActiveTodo) {
    inputCheckAllTodo.checked = true;
  } else {
    inputCheckAllTodo.checked = false;
  }

  value.forEach((todo) => {
    const liElement = document.createElement('li');
    liElement.classList.add('todos__item', 'todo');
    liElement.dataset.id = String(todo.id);

    const inputCheckElement = document.createElement('input');
    inputCheckElement.classList.add('visually-hidden', 'todo__input-check');
    inputCheckElement.type = 'checkbox';
    inputCheckElement.setAttribute('id', String(todo.id));

    if (todo.status === 'completed') {
      liElement.classList.add('todo--completed');
      inputCheckElement.checked = true;
    }

    const labelElement = document.createElement('label');
    labelElement.classList.add('todo__checkbox');
    labelElement.append(inputCheckElement);
    const spanMarkElement = document.createElement('span');
    spanMarkElement.classList.add('todo__checkbox-mark');
    labelElement.append(spanMarkElement);

    const pElement = document.createElement('p');
    pElement.classList.add('todo__title');
    pElement.textContent = todo.title;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('todo__button-delete');
    buttonElement.setAttribute('type', 'button');
    buttonElement.dataset.id = todo.id;

    liElement.append(labelElement);
    liElement.append(pElement);
    liElement.append(buttonElement);
    elements.todosList.append(liElement);
  });
};

const watchedState = (state, elements) =>
  watcher(state, (path, value) => {
    switch (path) {
      case 'filter':
        // processStateHandler(value, elements, i18next);
        break;
      case 'todos':
        addTodoHandler(value, elements);
        // console.log('todos', typeof value[0].id);
        break;
      default:
        break;
    }
  });

export default watchedState;
