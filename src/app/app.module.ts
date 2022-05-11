import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksFooterComponent } from './components/tasks-footer/tasks-footer.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmptyTasksComponent } from './components/empty-tasks/empty-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AutoFocus } from './directives/autofocus.directive';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks/completed-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksHeaderComponent,
    ButtonComponent,
    TasksFooterComponent,
    TasksComponent,
    TaskItemComponent,
    EmptyTasksComponent,
    AddTaskComponent,
    AutoFocus,
    PendingTasksComponent,
    CompletedTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
