import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  newTaskForm = new FormGroup({
    text: new FormControl('', Validators.required),
    day: new FormControl(new Date()),
    completed: new FormControl(false),
  });
  minDate = new Date();
  constructor(private tasksService: TaskService, private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {}

  createNewTask() {
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
