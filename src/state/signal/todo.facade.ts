import { inject, Injectable } from '@angular/core';
import { TodoStore } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TodoStoreFacade {
  #store = inject(TodoStore);

  public readonly todos = this.#store.todos;

  public readonly loading = this.#store.loading;

  public readonly error = this.#store.error;

  public loadTodos() {
    this.#store.loadTodos();
  }

  public toggleTodo(id: number) {
    this.#store.toggleTodo(id);
  }

  public removeTodo(id: number) {
    this.#store.removeTodo(id);
  }
}
