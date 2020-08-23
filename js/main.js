"use strict";
const todoControl = document.querySelector(".todo-control"),
	headerInput = document.querySelector(".header-input"),
	todoList = document.querySelector(".todo-list"),
	todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

function render() {
	todoList.textContent = "";
	todoCompleted.textContent = "";

	todoData.forEach(function (item) {
		const li = document.createElement("li");
		li.classList.add("todo-item");

		li.innerHTML =
			'<span class="text-todo">' +
			item.value +
			"</span>" +
			'<div class="todo-buttons">' +
			'<button class="todo-remove">' +
			'<button class="todo-complete">' +
			"</div>";

		if (item.complated) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}

		const btnTodoCompleted = li.querySelector(".todo-complete"),
			btnTodoRemove = li.querySelector(".todo-remove");

		btnTodoCompleted.addEventListener("click", () => {
			item.complated = !item.complated;
			localStorage.setItem("todo", JSON.stringify(todoData));
			render();
		});
		//удаление из массива списка
		btnTodoRemove.addEventListener("click", () => {
			if (todoData.indexOf(item) >= 0) {
				todoData.splice(todoData.indexOf(item), 1);
			}
			localStorage.setItem("todo", JSON.stringify(todoData));
			render();
		});
	});
}
todoControl.addEventListener("submit", (event) => {
	event.preventDefault();
	//выполнение условия на то что можно ли добавить пустой инпут
	if (!headerInput.value) {
		return;
	} else {
		const newTodo = {
			value: headerInput.value,
			complated: false,
		};
		todoData.push(newTodo);
	}
	headerInput.value = "";
	localStorage.setItem("todo", JSON.stringify(todoData));
	render();
});
//скрипт подтягивает все данны из localStorage и возвращает их в нашу верстку
if (localStorage.getItem("todo")) {
	todoData = JSON.parse(localStorage.getItem("todo"));
	render();
}
render();
