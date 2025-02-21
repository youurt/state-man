import { Component, inject, OnInit } from '@angular/core';
import { TodoStoreFacade } from 'src/state/todo/todo.facade';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

@Component({
  imports: [TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly #todoFacade = inject(TodoStoreFacade);

  readonly todos = this.#todoFacade.todos;

  readonly todosLoading = this.#todoFacade.loading;

  ngOnInit() {
    this.#todoFacade.loadTodos();
  }

  toggleTodo(id: number) {
    this.#todoFacade.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.#todoFacade.removeTodo(id);
  }
}
