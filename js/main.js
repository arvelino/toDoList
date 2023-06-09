
/* Seleção de elementos */
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

const filter = document.querySelector('#filter-select');
const memoria = localStorage;
let buscarMemoria = '';
let arrayMemoria=[];
let valorMemoria ={};
let oldInputValue;
let id = 0;
let chave = 0;

/* reinicia o localStorege */
// memoria.clear();


/* Funções */
const saveTodo = (text, numId)=>{
    const todo = document.createElement("div");
    todo.classList.add("todo");
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const inputId = document.createElement('input');
    inputId.classList.add('hide');
    inputId.innerText = numId;
    todo.appendChild(inputId);

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

/* Inclui as tarefas na página e na memória */
todoForm.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    const inputValue = todoInput.value;
    
    if(inputValue){
        if(memoria.getItem(0)){
            arrayMemoria = JSON.parse(memoria.getItem(0));
            id = arrayMemoria.length
        }
        valorMemoria ={"id":`${id}`,"valor":`${inputValue}`};
        arrayMemoria.push(valorMemoria);
        saveTodo(inputValue,id);
        memoria.setItem(0,JSON.stringify(arrayMemoria));
        buscarMemoria = JSON.parse(memoria.getItem(0));
        id++;
    }
});

/* Edita as tarefas */
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
        
        const valorId = parenteElemento.querySelector('input').innerText;
        console.log(valorId);
        console.log(buscarMemoria);
        buscarMemoria.forEach(item=>{
            // console.log(item);
            if(valorId==item.id){
                const ind = buscarMemoria.findIndex(i=>i.id==valorId);
                buscarMemoria.splice(ind,1);
                console.log('entrou');
                console.log(buscarMemoria);
                const updateMemoria = buscarMemoria;
                memoria.setItem(0,JSON.stringify(updateMemoria));
                
            }
            
        })
        parenteElemento.remove();
    }   

})


/* evento para cancelar edição */
cancelEditBtn.addEventListener("click",(evento)=>{
    evento.preventDefault();
    toggleForms();
})
/* evento para editar formulario */
editForm.addEventListener('submit',(evento)=>{
    evento.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
})

/* filter */
filter.addEventListener('change',(evento)=>{
    const valorFiltro = evento.target.value;
    const listaTarefas = document.querySelectorAll('.todo');

    if(valorFiltro =='done'){
        listaTarefas.forEach((e) =>{
            const classEl = e.classList 
            if(!classEl.contains('done')){  
                classEl.add('hide');
                e.id = 'hide';
            }else{
                e.id="";
            }
        })

    }
    if(valorFiltro =='all'){
        listaTarefas.forEach((e) =>{
            const classEl = e.classList
            classEl.toggle('hide');
            e.id = '';
        })
    }
    if(valorFiltro =='todo'){
        listaTarefas.forEach((e) =>{
            const classEl = e.classList
            if(classEl.contains('done')){  
                classEl.add('hide');
                e.id = 'hide';
            }else{
                classEl.remove('hide');
                e.id = '';
            }
        })

    }

})

/* atualiza os dados da memória */
window.onload = ()=>{
    
    if(memoria.getItem(0)){
        id = arrayMemoria.length;
        buscarMemoria = JSON.parse(memoria.getItem(0));
        buscarMemoria.forEach((item)=>{    
            saveTodo(item.valor,item.id);
        })

    }
}

// memoria.clear();
