import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import type { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  pendingTasks: Task[] = [];

  constructor() {}

  getTasks(): Observable<Task[]> {
    const tasks = of(this.tasks);
    return tasks;
  }

  getCompletedTasks(): Observable<Task[]> {
    const completedTasks = of(this.completedTasks);
    return completedTasks;
  }

  getPendingTasks(): Observable<Task[]> {
    const pendingTasks = of(this.pendingTasks);
    return pendingTasks;
  }

  addTask(task: Task) {
    const newTask = { ...task, id: uuidv4() };
    this.tasks.push(newTask);
    task.completed ? this.completedTasks.push(newTask) : this.pendingTasks.push(newTask);
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(item => item.id !== task.id);
    this.completedTasks = this.completedTasks.filter(item => item.id !== task.id);
    this.pendingTasks = this.pendingTasks.filter(item => item.id !== task.id);
    return of(this.tasks);
  }
}
