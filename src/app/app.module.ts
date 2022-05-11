import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component';
import { ButtonComponent } from './components/button/button.component';
import { TasksFooterComponent } from './components/tasks-footer/tasks-footer.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RippleModule } from 'primeng/ripple';
import { EmptyTasksComponent } from './components/empty-tasks/empty-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AutoFocus } from './directives/autofocus.directive';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    TasksHeaderComponent,
    ButtonComponent,
    TasksFooterComponent,
    TaskItemComponent,
    EmptyTasksComponent,
    AddTaskComponent,
    AutoFocus,
    PendingTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ButtonModule,
    RippleModule,
    ToastModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
