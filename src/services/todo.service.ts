import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, firstValueFrom } from 'rxjs';
import { Todo } from 'src/models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #http = inject(HttpClient);

  #apiUrl = 'https://jsonplaceholder.typicode.com/todos/';

  async getAllTodos() {
    return await firstValueFrom(
      this.#http.get<Todo[]>(this.#apiUrl).pipe(delay(1000))
    );
  }

  async removeTodo(id: number) {
    await firstValueFrom(this.#http.delete<void>(`${this.#apiUrl}/${id}`));
  }
}
