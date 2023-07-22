'use strict';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(function (task) {
    addTask(task);
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = input.value;
  if (task) {
    addTask(task);
    input.value = '';

    // Save tasks to local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

function addTask(task) {
  const li = document.createElement('li');
  li.textContent = task;

  // const editButton = document.createElement('span');
  // editButton.textContent = 'edit';
  // editButton.className = 'edit';

  const deleteButton = document.createElement('span');
  deleteButton.textContent = '⛔';
  deleteButton.className = 'delete';

  // editButton.addEventListener('click', function () {
  //   if (editButton.innerText.toLowerCase() == 'edit') {
  //     editButton.innerText = 'save';
  //     li.removeAttribute('readonly');
  //     li.focus();
  //   } else {
  //     editButton.innerText = 'Edit';
  //     li.setAttribute('readonly', 'readonly');
  //   }
  // });
  deleteButton.addEventListener('click', function () {
    li.remove();

    // Remove task from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  //li.appendChild(editButton);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
}
