import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss'],
})
export class PendingTasksComponent implements OnInit {
  @Output() dispatchDeleteTask: EventEmitter<Task> = new EventEmitter();
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  pendingTasks: Task[] = [];
  showEmptyState = this.tasks.length <= 0;
  showEmptyStateForCompletedTasks = this.completedTasks.length <= 0;
  showEmptyStateForPendingTasks = this.pendingTasks.length <= 0;
  faTimes = faTimes;

  constructor(private tasksService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.getPendingTasks();
    this.getCompletedTasks();
    this.filterTasks(this.tasks);
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
    this.completedTasks = tasks
      .filter(task => task.completed)
      .sort((task1, task2) => task1.sortedPosition - task2.sortedPosition);
    this.pendingTasks = tasks
      .filter(task => !task.completed)
      .sort((task1, task2) => task1.sortedPosition - task2.sortedPosition);
    this.showEmptyStateForPendingTasks = this.pendingTasks.length <= 0;
    this.showEmptyStateForCompletedTasks = this.completedTasks.length <= 0;
    this.showEmptyState = this.tasks.length <= 0;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const task = event.container.data[event.currentIndex];
      if (task.completed) {
        this.tasksService
          .updateCompletedTasksOnSort(event.container.data, task)
          .subscribe(tasks => this.filterTasks(tasks));
      } else {
        this.tasksService
          .updatePendingTasksOnSort(event.container.data, task)
          .subscribe(tasks => this.filterTasks(tasks));
      }
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // change completedState of task
      const task = event.container.data[event.currentIndex];
      task.completed = !task.completed;
      this.tasksService.updateTask(task).subscribe(_ => {
        if (task.completed) {
          this.tasksService
            .updateCompletedTasksOnSort(event.container.data, task)
            .subscribe(tasks => this.filterTasks(tasks));
        } else {
          this.tasksService
            .updatePendingTasksOnSort(event.container.data, task)
            .subscribe(tasks => this.filterTasks(tasks));
        }
      });
    }
  }
}
