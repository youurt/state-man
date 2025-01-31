import { Component, input, output } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  imports: [TodoItemComponent],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  readonly todos = input<Todo[]>([]);

  readonly toggleTodo = output<number>();

  readonly removeTodo = output<number>();
}
