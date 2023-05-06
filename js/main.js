
/* Seleção de elementos */
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

/* Funções */
const saveTodo = (text)=>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);
    todoInput.value = '';
    todoInput.focus();
}

const toggleForms = ()=>{
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo)=>{

        let todoTitle = todo.querySelector('h3');

        if(todoTitle.innerHTML === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

/* Eventos */



todoForm.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    const inputValue = todoInput.value;
    
    if(inputValue){
        saveTodo(inputValue);
    }
});

document.addEventListener('click',(evento)=>{
    const elemento = evento.target;
    const parenteElemento = elemento.closest("div");
    let todoTitle;

    if(parenteElemento && parenteElemento.querySelector('h3')){
        todoTitle = parenteElemento.querySelector('h3').innerHTML;
    }

    /* Finalizado */
    if(elemento.classList.contains("finish-todo")){
        parenteElemento.classList.toggle('done');
    }
    /* Edição */
    if(elemento.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
    /* Excluir */
    if(elemento.classList.contains("remove-todo")){
        parenteElemento.remove();
    }   

})

cancelEditBtn.addEventListener("click",(evento)=>{
    evento.preventDefault();
    toggleForms();
})

editForm.addEventListener('submit',(evento)=>{
    evento.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
})