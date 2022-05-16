import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  public newTaskForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    day: new FormControl(new Date()),
    completed: new FormControl(false),
  });
  public minDate: Date = new Date();

  constructor(private tasksService: TaskService, private messageService: MessageService, private router: Router) {}

  public createNewTask(): void {
    if (this.newTaskForm.status === 'INVALID') {
      this.messageService.add({ severity: 'warn', summary: 'Text Field', detail: 'Please add a task.' });
    } else {
      this.tasksService.addTask(this.newTaskForm.value);
      this.messageService.add({
        severity: 'success',
        summary: `Task: ${this.newTaskForm.value.text}`,
        detail: `Added successfully!`,
      });
      this.router.navigate(['/']);
    }
  }
}
