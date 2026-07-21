import { Component, model, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import { TodoData, TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-todo-lists',
  standalone: false,
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'] 
})
export class TodoListsComponent implements OnInit {
  listTodo!: TodoData[]; 
  dataItems: any =[];
  isCheck:boolean = false;
  taskName: string = '';
  taskFilter: string = '';
  isDark: boolean = false;
  selected = model<Date | null>(null);
  currentDate: Date = new Date();

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

  public deleteItemById(id: string) {
    this.todoService.delete(id).subscribe(() => {
      this.getTodoLists();
    })
  }

  public openDialog(id?: string, isDontForget?: boolean) {
    const dialogRef = this.dialog.open(TodoDetailsComponent, {
      data: { id: id , isDontForget: isDontForget },
      width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.getTodoLists();
    });
  }

  public toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
    this.updatedStatus(task.id, task);
  }
  
  private updatedStatus(id:string, data:any) {
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

  get priorityTodos(): TodoData[] {
    const high = this.listTodo.filter(t => t.priority === 'high' && !t.completed);
    const medium = this.listTodo.filter(t => t.priority === 'medium' && !t.completed);
    return [...high, ...medium].slice(0, 3);
  }

  get lowPriority() {
    return this.listTodo.filter(t => t.priority === 'low' && !t.completed);
  }
}
