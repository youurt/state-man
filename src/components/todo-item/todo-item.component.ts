import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  imports: [NgClass],
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  todo = input<Todo>();

  toggleTodo = output();

  removeTodo = output();
}
