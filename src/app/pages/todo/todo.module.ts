import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    TodoListsComponent,
    TodoDetailsComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatDialogModule,
    MatButtonModule,
    // HttpClientModule
  ],
  providers: [
    provideHttpClient(), // ✅ Use this instead
  ],
})
export class TodoModule { }
