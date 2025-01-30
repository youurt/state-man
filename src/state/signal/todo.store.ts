import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from 'src/models/todo.model';
import { TodoService } from 'src/services/todo.service';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodoState = {
  todos: [],
  loading: true,
  error: null,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('TodoStore'),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadTodos: async () => {
      const todos = await todoService.getAllTodos();
      patchState(store, (state) => ({
        ...state,
        todos,
        loading: false,
        error: null,
      }));
    },
    toggleTodo: (id: number) => {
      patchState(store, (state) => ({
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
    },
    removeTodo: async (id: number) => {
      await todoService.removeTodo(id);
      patchState(store, (state) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
  }))
);
