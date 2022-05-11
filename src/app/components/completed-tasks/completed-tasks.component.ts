import { Component, OnInit } from '@angular/core';
import type { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
})
export class CompletedTasksComponent implements OnInit {
  tasks: Task[] = [];
  showEmptyState = this.tasks.length <= 0;
  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.showEmptyState = tasks.length <= 0;
    });
  }
}
