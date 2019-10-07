
var todos = Gun().get('todos');
//let todoItems = [];


// add new todo and render it 
function addTodo(text) {
  var todo = {
    text,
    checked: false,
    id: Date.now(),
  };
 //todoItems.push(todo);
    todos.set(todo);
    
  const list = document.querySelector('.js-todo-list');
  pos ='beforeend';
  render = `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `;
   list.insertAdjacentHTML(pos ,render);
   console.log(todos.get(todo));
}
const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

// mark todo as done 

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

function toggleDone(key) {

  const item = document.querySelector(`[data-key='${key}']`);
    todos.get(key).put({checked: true});
    item.classList.add('done');
    if(todos.checked === true) {
       todo.get(key).put({checked: false});
       item.classList.remove('done');
    
  }
  // const item = document.querySelector(`[data-key='${key}']`);
  // todos.get(key).on(function(todo){
  //   if(todo.checked=== true) {
  //     console.log("f")
  //     todo.get(key).put({checked: false});
  //     item.classList.remove('done');
  //   }
  //   else{
  //     console.log("t")
  //      todo.get(key).put({checked: true});
  //      item.classList.add('done');
  //   }
  // })

}

function deleteTodo(key) {
  todos.get(key).put(null);
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();

}