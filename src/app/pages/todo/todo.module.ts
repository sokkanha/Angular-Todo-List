import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [
    TodoListsComponent,
    TodoDetailsComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
    provideNativeDateAdapter()
  ],
})
export class TodoModule { }
