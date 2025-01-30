import { NgFor } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  imports: [NgFor, TodoItemComponent],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todos = input<Todo[]>([]);

  toggleTodo = output<number>();

  removeTodo = output<number>();
}
