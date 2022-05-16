import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { timer } from 'rxjs';

import { TaskService } from 'src/app/services/task.service';

import type { Task, TasksType } from 'src/app/models/task';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss'],
})
export class PendingTasksComponent implements OnInit {
  @Output() public dispatchDeleteTask: EventEmitter<Task> = new EventEmitter();
  public tasks: Task[] = [];
  public completedTasks: Task[] = [];
  public pendingTasks: Task[] = [];
  public showEmptyState: boolean = true;
  public showEmptyStateForCompletedTasks: boolean = true;
  public showEmptyStateForPendingTasks: boolean = true;
  public faTimes: IconDefinition = faTimes;
  public loading = true;

  constructor(private tasksService: TaskService) {
    // ToDo
  }

  public ngOnInit(): void {
    this.getTasks();
    this.getPendingTasks();
    this.getCompletedTasks();
    this.filterTasks(this.tasks);
    this.fakeLoading(1500);
  }

  public getTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.showEmptyState = tasks.length <= 0;
    });
  }

  public getCompletedTasks(): void {
    this.tasksService.getCompletedTasks().subscribe(completedTasks => {
      this.completedTasks = completedTasks;
      this.showEmptyStateForCompletedTasks = completedTasks.length <= 0;
    });
  }

  public getPendingTasks(): void {
    this.tasksService.getPendingTasks().subscribe(pendingTasks => {
      this.pendingTasks = pendingTasks;
      this.showEmptyStateForPendingTasks = pendingTasks.length <= 0;
    });
  }

  public deleteTask(task: Task): void {
    this.tasksService.deleteTask(task).subscribe(tasks => this.filterTasks(tasks));
  }

  public filterTasks(tasks: Task[]): void {
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

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const task = event?.container?.data[event.currentIndex];
      if (!task) return;

      if (task.completed) this.refreshTasksOnSort(event.container.data, task, 'COMPLETED');
      else this.refreshTasksOnSort(event.container.data, task, 'PENDING');
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const task = event?.container?.data[event.currentIndex];
      if (!task) return;

      task.completed = !task.completed;
      this.tasksService.updateTask(task).subscribe(_ => {
        if (task.completed) this.refreshTasksOnSort(event.container.data, task, 'COMPLETED');
        else this.refreshTasksOnSort(event.container.data, task, 'PENDING');
      });
    }
  }

  private refreshTasksOnSort(tasks: Task[], task: Task, type: TasksType): void {
    if (type === 'COMPLETED') {
      this.tasksService.updateCompletedTasksOnSort(tasks, task).subscribe(tasks => this.filterTasks(tasks));
    }
    if (type === 'PENDING') {
      this.tasksService.updatePendingTasksOnSort(tasks, task).subscribe(tasks => this.filterTasks(tasks));
    }
  }

  public fakeLoading(ms: number): void {
    timer(ms).subscribe(() => {
      this.loading = false;
    });
  }
}
