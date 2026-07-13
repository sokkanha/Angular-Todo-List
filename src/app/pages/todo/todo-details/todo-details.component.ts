import { Component, Inject, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

export type Priority = 'low' | 'medium' | 'high';
export interface TodoData {
  title: string;
  completed: boolean;
  priority: Priority;
  due: string | null;
}

@Component({
  selector: 'app-todo-details',
  standalone: false,
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss'
})
export class TodoDetailsComponent implements OnInit{
  public todoId: number | null = null;
  public loading = false;

  public todoData: TodoData = {
    title: '',
    completed: false,
    priority: 'medium',
    due: null
  };

  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialogRef<TodoDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number } | null
  ) {
    this.todoId = data?.id ?? null;
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

  public save(): void {
    if (!this.canSave || this.loading) {
      return;
    }
    this.todoId ? this.update(this.todoId) : this.add();
  }

  public close(): void {
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

  private update(id: number): void {
    this.loading = true;

    this.todoService.update(id, this.todoData)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        if(!res) return;

        this.dialogRef.close(res);
      });
  }

  private getDataById(id: number): void {
    this.todoService.getById(id).subscribe((res) => {
      this.todoData = {
        title: res?.title || '',
        completed: res?.completed || false,
        priority: (res as any)?.priority || 'medium',
        due: (res as any)?.due || null
      };
    });
  }
}
