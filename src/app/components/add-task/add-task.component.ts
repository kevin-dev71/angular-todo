import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  newTaskForm = new FormGroup({
    text: new FormControl('', Validators.required),
    day: new FormControl(new Date().toLocaleDateString('en-US')),
    completed: new FormControl(false),
  });
  constructor(private tasksService: TaskService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  createNewTask() {
    if (this.newTaskForm.status === 'INVALID') {
      this.toastr.error(`Please fill Text field.`);
    } else {
      this.tasksService.addTask(this.newTaskForm.value);
      this.toastr.success(`${this.newTaskForm.value.text} added successfully!`);
    }
  }
}
