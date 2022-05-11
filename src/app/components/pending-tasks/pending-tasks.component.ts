import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import type { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss'],
})
export class PendingTasksComponent implements OnInit {
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  pendingTasks: Task[] = [];
  showEmptyState = this.tasks.length <= 0;
  showEmptyStateForCompletedTasks = this.completedTasks.length <= 0;
  showEmptyStateForPendingTasks = this.pendingTasks.length <= 0;
  faTimes = faTimes;

  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.getPendingTasks();
    this.getCompletedTasks();
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.showEmptyState = tasks.length <= 0;
    });
  }

  getCompletedTasks(): void {
    this.tasksService.getCompletedTasks().subscribe(completedTasks => {
      this.completedTasks = completedTasks;
      this.showEmptyStateForCompletedTasks = completedTasks.length <= 0;
    });
  }

  getPendingTasks(): void {
    this.tasksService.getPendingTasks().subscribe(pendingTasks => {
      this.pendingTasks = pendingTasks;
      this.showEmptyStateForPendingTasks = pendingTasks.length <= 0;
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task).subscribe(tasks => this.filterTasks(tasks));
  }

  filterTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.completedTasks = tasks.filter(task => task.completed);
    this.pendingTasks = tasks.filter(task => !task.completed);
    this.showEmptyStateForPendingTasks = this.pendingTasks.length <= 0;
    this.showEmptyStateForCompletedTasks = this.completedTasks.length <= 0;
    this.showEmptyState = this.tasks.length <= 0;
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
