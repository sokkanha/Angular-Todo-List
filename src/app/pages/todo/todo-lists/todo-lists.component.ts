import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { TodoService, Todo } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-lists',
  standalone: false,
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'] 
})
export class TodoListsComponent implements OnInit {
  public listTodo: Todo[] = []; 
  public isCheck:boolean = false;
  
  constructor(
    private todoService:TodoService,
    private dialog:MatDialog
  ){}
  
  ngOnInit(): void {
    this.getTodoLists(); 
  }

  private getTodoLists() {
    this.todoService.list().subscribe(res => {
      if(!res) return;
      this.listTodo = res;
    })
  }

  public deleteItemById(id: any) {
    this.todoService.delete(id).subscribe(() => {
      this.getTodoLists();
    })
  }

  public openDialog(id?: number) {
    const dialogRef = this.dialog.open(TodoDetailsComponent, {
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getTodoLists();
    });
  }

  public toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
    this.updatedStatus(task.id, task);
  }
  
  private updatedStatus(id:number, data:any) {
    this.todoService.update(id,data).subscribe();
  }
}
