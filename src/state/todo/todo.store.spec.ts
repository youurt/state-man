import { TestBed } from '@angular/core/testing';
import { Todo } from 'src/models/todo.model';
import { LoginService } from 'src/services/login.service';
import { TodoService } from 'src/services/todo.service';
import {
  createTodoServiceMock,
  createLoginServiceMock,
} from 'src/services/mocks';
import { initialState, TodoStore } from './todo.store';

describe('TodoStore', () => {
  const setup = () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TodoService,
          useValue: createTodoServiceMock(),
        },
        {
          provide: LoginService,
          useValue: createLoginServiceMock(),
        },
      ],
    });

    return {
      store: TestBed.inject(TodoStore),
      todoService: TestBed.inject(TodoService),
      loginService: TestBed.inject(LoginService),
    };
  };

  const mockTodos: Todo[] = [
    { userId: 1, id: 1, title: 'Test Todo', completed: false },
  ];

  it('should initialize with default state', () => {
    const { store } = setup();

    expect(store.todos()).toEqual(initialState.todos);
    expect(store.loading()).toEqual(initialState.loading);
    expect(store.error()).toEqual(initialState.error);
  });

  it('should call login on init', () => {
    const { loginService } = setup();
    expect(loginService.login).toHaveBeenCalled();
  });

  it('should set loading to true and then load todos', async () => {
    const { store, todoService } = setup();

    (todoService.getAllTodos as jest.Mock).mockReturnValue(
      Promise.resolve(mockTodos)
    );

    await store.loadTodos();

    expect(store.loading()).toBe(false);
    expect(store.todos()).toEqual(mockTodos);
    expect(store.error()).toBeNull();
  });

  it('should toggle todo completed state', async () => {
    const { store, todoService } = setup();

    (todoService.getAllTodos as jest.Mock).mockReturnValue(
      Promise.resolve(mockTodos)
    );

    await store.loadTodos();

    expect(store.todos()).toEqual(mockTodos);
    expect(store.todos()[0].completed).toBe(false);

    store.toggleTodo(1);

    expect(store.todos()).not.toEqual(mockTodos);
    expect(store.todos()[0].completed).toBe(true);
  });

  it('should remove todo', async () => {
    const { store, todoService } = setup();

    (todoService.getAllTodos as jest.Mock).mockReturnValue(
      Promise.resolve(mockTodos)
    );

    await store.loadTodos();

    expect(store.todos()).toEqual(mockTodos);

    await store.removeTodo(1);

    expect(todoService.removeTodo).toHaveBeenCalledWith(1);
    expect(store.todos()).toEqual([]);
  });
});
