import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import type { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');
  completedTasks: Task[] = [];
  pendingTasks: Task[] = [];

  constructor() {
    this.completedTasks = this.tasks.filter(item => item.completed);
    this.pendingTasks = this.tasks.filter(item => !item.completed);
  }

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
    const jsonData = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', jsonData);
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(item => item.id !== task.id);
    this.completedTasks = this.completedTasks.filter(item => item.id !== task.id);
    this.pendingTasks = this.pendingTasks.filter(item => item.id !== task.id);
    const jsonData = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', jsonData);
    return of(this.tasks);
  }

  updateTask(task: Task) {
    this.tasks = this.tasks.map(item => (item.id === task.id ? { ...item, completed: !item.completed } : item));
    this.completedTasks = this.completedTasks.filter(item => item.id !== task.id);
    this.pendingTasks = this.pendingTasks.filter(item => item.id !== task.id);
    const jsonData = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', jsonData);
    return of(this.tasks);
  }
}
