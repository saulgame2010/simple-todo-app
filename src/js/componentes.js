import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias al HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div;
}

// Eventos
txtInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (e) => {
    const elemento = e.target.localName; // input | label | button
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    if(elemento.includes('input')) { //Aquí verificamos si hizo click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    else if(elemento.includes('button')) { // Aquí verificamos que se hizo click en el botón
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if(!filtro) {return;}
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');
    for(const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro) {
            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});