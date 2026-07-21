import { Component, Inject, OnInit } from '@angular/core';
import { Priority, TodoData, TodoService } from '../../../services/todo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todo-details',
  standalone: false,
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss'
})
export class TodoDetailsComponent implements OnInit{
  todoId: string;
  loading = false;
  isDontForgot: boolean = false;

  todoData: TodoData = {
    title: '',
    completed: false,
    priority: 'medium',
    due: null
  };

  priorities = [
    {
      value: 'low',
      label: 'Low',
      color: '#E7C463',
      border: '#E7C463',
      bg: '#FBF1D9'
    },
    {
      value: 'medium',
      label: 'Medium',
      color: '#E99AA6',
      border: '#E99AA6',
      bg: '#FBEBEE'
    },
    {
      value: 'high',
      label: 'High',
      color: '#B9CBAB',
      border: '#B9CBAB',
      bg: '#EAF1E4'
    }
  ];

  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialogRef<TodoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any , isDontForget?: boolean , data?: TodoData} | null
  ) {
    this.todoId = data?.id ?? null;
    this.isDontForgot = data?.isDontForget ?? false;

    this.isDontForgot && (this.todoData.priority = 'low');
  }

  ngOnInit(): void {
    if (this.todoId) {
      this.getDataById(this.todoId);
    }
  }

  get canSave(): boolean {
    return this.todoData.title.trim().length > 0;
  }

  selectPriority(p: Priority): void {
    this.todoData.priority = p;
  }

   save(): void {
    if (!this.canSave || this.loading) {
      return;
    }
    this.todoId ? this.update(this.todoId) : this.add();
  }

   close(): void {
    this.dialogRef.close();
  }

  private add(): void {
    this.loading = true;

    this.todoService.create(this.todoData)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        if(!res) return;

        this.dialogRef.close(res);
      });
  }

  private update(id: string): void {
    this.loading = true;

    this.todoService.update(id, this.todoData)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        if(!res) return;

        this.dialogRef.close(res);
      });
  }

  private getDataById(id: string): void {
    this.todoService.getById(id).subscribe((res) => {
      this.todoData = {
        id: id,
        title: res?.title || '',
        completed: res?.completed || false,
        priority: (res as any)?.priority || 'medium',
        due: (res as any)?.due || null
      };
    });
  }
}
