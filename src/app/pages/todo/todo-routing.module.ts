import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  {path: '', component: TodoListsComponent},
  {path: 'add', component: TodoDetailsComponent},
  {path: 'edit/:id', component: TodoDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
