//Select Elements
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todosListEl = document.getElementById('todos-list');
const notificationEl = document.querySelector(".notification")
const clear= document.querySelector("#clear")
//Vars
let todos = []
let EditTodoId = -1;
console.log(todosListEl)

//Form Submit
form.addEventListener('submit', function (event) {
    event.preventDefault();

    saveTodo();
    renderTodos();

})
clear.addEventListener('click', function(){
todosListEl.innerHTML=''
})


// Save Todo
function saveTodo() {
    const todoValue = todoInput.value;

    //Empty Todo
    const isEmpty = todoValue === '';
    //Duplicate Todo
    const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase())

    if (isEmpty) {
        showNotification("Todo's input is empty");
    }
    else if (isDuplicate) {
        showNotification('Todo already exists')
    }
    else {
        if (EditTodoId >= 0) {
            //update edited todo
            todos = todos.map((todo, index) => ({
                ...todo,
                value: index === EditTodoId ? todoValue : todo.value,
            }))
            EditTodoId = -1;
        } else {
            todos.push({
                value: todoValue,
                checked: false,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            });
        }
        todoInput.value = '';

    }
    
}
//Render Todos
function renderTodos() {
    //Prevent from Re-Render
    todosListEl.innerHTML = '';
    //Render Todos
    todos.forEach((todo, index) => {
        todosListEl.innerHTML += `
<div class="todo" id="${index}">
<i 
 class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
 style="color:${todo.color}"
 data-action="check"
 ></i>

<p class="${todo.checked ? 'checked' : ''}""  data-action='check'>${todo.value}</p>
<i class="bi bi-pencil-square"  data-action='edit'></i>
<i class="bi bi-trash3"  data-action='delete'></i>

</div>
`;
    })
}

//Click Event Listner for all the Todos
todosListEl.addEventListener('click', (event) => {
    const target = event.target
    const parentElement = target.parentNode

    if (parentElement.className !== 'todo') return;

    //Todo ID
    const todo = parentElement;
    const todoId = Number(todo.id);

    //Target action
    const action = target.dataset.action;

    action === 'check' && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
});
// CHECK A TODO
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));

    renderTodos();

}
// EDIT A TODO
function editTodo(todoId) {
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

//Delete Todo
function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;
    //Re-Render
    renderTodos();
}
// SHOW A NOTIFICATION
function showNotification(msg) {
    // change the message
    notificationEl.innerHTML = msg;

    // notification enter
    notificationEl.classList.add('notif-enter');

    // notification Vanish
    setTimeout(() => {
        notificationEl.classList.remove('notif-enter');
    }, 2000);
}



