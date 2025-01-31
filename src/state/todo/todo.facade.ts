import { inject, Injectable } from '@angular/core';
import { TodoStore } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TodoStoreFacade {
  readonly #store = inject(TodoStore);

  readonly todos = this.#store.todos;

  readonly loading = this.#store.loading;

  readonly error = this.#store.error;

  loadTodos() {
    this.#store.loadTodos();
  }

  toggleTodo(id: number) {
    this.#store.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.#store.removeTodo(id);
  }
}
