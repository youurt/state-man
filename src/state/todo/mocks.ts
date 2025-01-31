import { signal } from '@angular/core';

export const createTodoFacadeMock = () => ({
  todos: signal([]),
  loading: signal(false),
  error: signal(null),
  loadTodos: jest.fn(),
  toggleTodo: jest.fn(),
  removeTodo: jest.fn(),
});

export type TodoFacadeMock = ReturnType<typeof createTodoFacadeMock>;
