import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, firstValueFrom } from 'rxjs';
import { Todo } from 'src/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #http = inject(HttpClient);

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos/';

  public async getAllTodos() {
    return await firstValueFrom(
      this.#http.get<Todo[]>(this.apiUrl).pipe(delay(1000))
    );
  }

  public async removeTodo(id: number): Promise<void> {
    await firstValueFrom(this.#http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
