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
import { TodoService } from 'src/services/todo.service';
import { withRemoveTodo } from './remove-todo.feature';
import { LoginService } from 'src/services/login.service';

export type TodoState = {
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
