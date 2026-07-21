import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Priority = 'low' | 'medium' | 'high';
export interface TodoData {
  id?: string;
  title: string;
  completed: boolean;
  priority: Priority;
  due: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public url:string = 'http://localhost:8080/todos/'
  constructor(
    private http: HttpClient
  ) { }

  create(data: TodoData) {
    return this.http.post<TodoData>(this.url, data);
  }
  
  list(params?: any) {
    return this.http.get<TodoData[]>(this.url, { params });
  }
  
  getById(id: string, params?: any) {
    return this.http.get<TodoData>(`${this.url}${id}`, { params });
  }
  
  update(id: string, data: TodoData) {
    return this.http.put<TodoData>(`${this.url}${id}`, data);
  }
  
  delete(id: string) {
    return this.http.delete<void>(`${this.url}${id}`);
  }
  
}
