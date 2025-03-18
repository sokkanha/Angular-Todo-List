import { Component, OnInit } from '@angular/core';
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
  public dataItems: any =[];
  public isCheck:boolean = false;
  public taskName: string = '';
  public taskFilter: string = '';
  public isDark: boolean = false;

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
      this.filterData();
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

  public filterData() {
    const filterData = this.taskName.trim() === '' 
    ? this.listTodo 
    : this.listTodo.filter(task =>
      task.title.toLowerCase().includes(this.taskName.toLowerCase())
    );

    if (this.taskFilter === 'Complete') {
      this.dataItems = filterData.filter(task => task.completed);
    } else if (this.taskFilter === 'InComplete') {
      this.dataItems = filterData.filter(task => !task.completed);
    } else {
      this.dataItems = filterData; // 'ALL' selected, no filtering by status
    }
  }

  public toggleDarkMode() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark-mode');  // Add dark mode class to body
    } else {
      document.body.classList.remove('dark-mode');  // Remove dark mode class from body
    }
  }
}
