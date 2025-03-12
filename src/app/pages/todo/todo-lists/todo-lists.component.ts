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
  private todoService = inject(TodoService);
  private dialog = inject(MatDialog);
  public listTodo: Todo[] = []; 
  ngOnInit(): void {
    this.getTodoLists(); 
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoDetailsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getTodoLists() {
    this.todoService.list().subscribe({
      next: (res) => {
        this.listTodo = res;
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
      }
    });
  }
}
