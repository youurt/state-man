import { TestBed } from '@angular/core/testing';
import { createTodoFacadeMock, TodoFacadeMock } from 'src/state/todo/mocks';
import { TodoStoreFacade } from 'src/state/todo/todo.facade';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let todoFacade: TodoFacadeMock;

  beforeEach(() => {
    todoFacade = createTodoFacadeMock();

    TestBed.configureTestingModule({
      providers: [{ provide: TodoStoreFacade, useValue: todoFacade }],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTodos on ngOnInit', () => {
    component.ngOnInit();
    expect(todoFacade.loadTodos).toHaveBeenCalled();
  });

  it('should call toggleTodo with correct id', () => {
    const id = 1;
    component.toggleTodo(id);
    expect(todoFacade.toggleTodo).toHaveBeenCalledWith(id);
  });

  it('should call removeTodo with correct id', () => {
    const id = 1;
    component.removeTodo(id);
    expect(todoFacade.removeTodo).toHaveBeenCalledWith(id);
  });
});
