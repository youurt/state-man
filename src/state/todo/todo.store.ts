import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Todo } from 'src/models/todo.model';
import { LoginService } from 'src/services/login.service';
import { TodoService } from 'src/services/todo.service';
import { withRemoveTodo } from './remove-todo.feature';

export type TodoState = {
  readonly todos: Todo[];
  readonly loading: boolean;
  readonly error: string | null;
};

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState<TodoState>(initialState),
  withDevtools('TodoStore'),
  withProps(() => ({
    todoService: inject(TodoService),
    loginService: inject(LoginService),
  })),
  withHooks({
    onInit(store) {
      store.loginService.login();
    },
  }),
  withRemoveTodo(),
  withMethods((store) => ({
    loadTodos: async () => {
      patchState(store, { loading: true });
      const todos = await store.todoService.getAllTodos();
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
  }))
);
