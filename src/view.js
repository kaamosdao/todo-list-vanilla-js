import watcher from './utils/watcher';

const addTodoHandler = (value, elements) => {
  elements.todosList.innerHTML = '';
  value.forEach((todo) => {
    const liElement = document.createElement('li');
    liElement.classList.add('todos__item', 'todo');
    liElement.dataset.id = String(todo.id);

    const inputCheckElement = document.createElement('input');
    inputCheckElement.classList.add('todo__input-check');
    inputCheckElement.type = 'checkbox';
    inputCheckElement.setAttribute('id', String(todo.id));
    const labelElement = document.createElement('label');
    labelElement.classList.add('visually-hidden');
    labelElement.setAttribute('for', String(todo.id));

    const pElement = document.createElement('p');
    pElement.classList.add('todo__title');
    pElement.textContent = todo.title;

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('todo__button-delete');
    buttonElement.setAttribute('type', 'button');
    buttonElement.dataset.id = todo.id;

    liElement.append(inputCheckElement);
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
