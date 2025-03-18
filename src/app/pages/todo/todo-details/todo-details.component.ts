import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../../services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-details',
  standalone: false,
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss'
})
export class TodoDetailsComponent implements OnInit{
  @ViewChild('todoForm') todoForm!: NgForm; 
  public todoId:any;
  public todoData = {
    title: ''
  };
  
  constructor(
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) {
    this.todoId = data.id;
  }

  ngOnInit(): void {
    if(this.todoId) {
      this.getDataById(this.todoId);
    }
  }

  public save() {
    if(this.todoForm.invalid) {
      return;
    }
    this.todoId ? this.update(this.todoId) : this.add();
  }

  private add() {
    this.todoService.create(this.todoData).subscribe(res => {
      if (!res) {return;} 
    });
  }

  private update(id: number) {
    this.todoService.update(id, this.todoData).subscribe(res => {
      if(!res) {return;}
    })
  }

  private getDataById(id: number) {
    this.todoService.getById(id).subscribe(res => {
      console.log('data from res', res)
      console.log(this.todoForm.value)
      this.todoForm.setValue({title: res?.title})
    })
  }
}
