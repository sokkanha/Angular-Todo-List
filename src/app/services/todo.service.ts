import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Todo {
  id?: number;
  title: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public url:string = 'http://localhost:8080/todos/'
  constructor(
    private http: HttpClient
  ) { }

  // create(data:any) {
  //   return this.http.post(this.url,data);
  // }

  // list(optional?:any) {
  //   return this.http.get(this.url,optional);
  // }

  // getById(id:number, data:any) {
  //   return this.http.get(`${this.url}/${id}`,data);
  // }

  // update(id:number, data:any) {
  //   return this.http.put(`${this.url}/${id}`,data);
  // }

  // delete(id:number) {
  //   return this.http.delete(`${this.url}/${id}`);
  // }
  create(data: Todo) {
    return this.http.post<Todo>(this.url, data);
  }
  
  list(params?: any) {
    return this.http.get<Todo[]>(this.url, { params });
  }
  
  getById(id: number, params?: any) {
    return this.http.get<Todo>(`${this.url}${id}`, { params });
  }
  
  update(id: number, data: Todo) {
    return this.http.put<Todo>(`${this.url}${id}`, data);
  }
  
  delete(id: number) {
    return this.http.delete<void>(`${this.url}${id}`);
  }
  
}
