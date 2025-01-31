export const createTodoServiceMock = () => ({
  getAllTodos: jest.fn().mockReturnValue(Promise.resolve([])),
  removeTodo: jest.fn().mockReturnValue(Promise.resolve()),
});

export type TodoServiceMock = ReturnType<typeof createTodoServiceMock>;

export const createLoginServiceMock = () => ({ login: jest.fn() });

export type LoginServiceMock = ReturnType<typeof createLoginServiceMock>;
