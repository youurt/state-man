import {
  signalStoreFeature,
  withMethods,
  type,
  patchState,
} from '@ngrx/signals';
import { TodoState } from './todo.store';
import { inject } from '@angular/core';
import { TodoService } from 'src/services/todo.service';

export function withRemoveTodo() {
  return signalStoreFeature(
    { state: type<TodoState>() },
    withMethods((store, todoService = inject(TodoService)) => ({
      removeTodo: async (id: number) => {
        await todoService.removeTodo(id);
        patchState(store, (state) => ({
          ...state,
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
    }))
  );
}
