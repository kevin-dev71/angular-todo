import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import type { Task, TasksType } from 'src/app/models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks: Task[] = [];
  public completedTasks: Task[] = [];
  public pendingTasks: Task[] = [];

  constructor() {
    this.tasks = this.loadTasksFromLocalStorage();
    this.sortTasks(this.tasks);
  }

  public getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  public getCompletedTasks(): Observable<Task[]> {
    return of(this.completedTasks);
  }

  public getPendingTasks(): Observable<Task[]> {
    return of(this.pendingTasks);
  }

  public addTask(task: Task): void {
    const newTask = { ...task, id: uuidv4(), sortedPosition: this.tasks.length };
    this.tasks.push(newTask);
    task.completed ? this.completedTasks.push(newTask) : this.pendingTasks.push(newTask);
    this.persistTaskData(this.tasks);
  }

  public deleteTask(task: Task): Observable<Task[]> {
    this.tasks = this.tasks.filter(item => item.id !== task.id);
    this.sortTasks(this.tasks);
    this.persistTaskData(this.tasks);
    return of(this.tasks);
  }

  public updateTask(task: Task): Observable<Task[]> {
    this.tasks = this.tasks.map(item => (item.id === task.id ? task : item));
    this.sortTasks(this.tasks);
    this.persistTaskData(this.tasks);
    return of(this.tasks);
  }

  public updateCompletedTasksOnSort(tasks: Task[], task: Task): Observable<Task[]> {
    this.sortOn(tasks, task, 'COMPLETED');
    this.persistTaskData(this.tasks);
    return of([...this.pendingTasks, ...this.completedTasks]);
  }

  public updatePendingTasksOnSort(tasks: Task[], task: Task): Observable<Task[]> {
    this.sortOn(tasks, task, 'PENDING');
    this.persistTaskData(this.tasks);
    return of(this.tasks);
  }

  private persistTaskData(tasks: Task[]): void {
    try {
      const jsonData = JSON.stringify(tasks);
      localStorage.setItem('tasks', jsonData);
    } catch (error) {
      throw error;
    }
  }

  private loadTasksFromLocalStorage(): Task[] {
    try {
      const tasksData = localStorage.getItem('tasks');
      if (!tasksData) return [];
      return JSON.parse(tasksData);
    } catch (error) {
      throw error;
    }
  }

  private sortTasks(tasks: Task[]): void {
    this.completedTasks = tasks
      .filter(item => item.completed)
      .sort((task1, task2) => task1.sortedPosition - task2.sortedPosition);
    this.pendingTasks = tasks
      .filter(item => !item.completed)
      .sort((task1, task2) => task1.sortedPosition - task2.sortedPosition);
  }

  private sortOn(tasks: Task[], task: Task, type: TasksType): void {
    if (type === 'COMPLETED') {
      this.completedTasks = tasks.map((item, index) => ({ ...item, sortedPosition: index }));
      this.pendingTasks.filter(item => item.id !== task.id);
      this.tasks = [...this.pendingTasks, ...this.completedTasks];
    }
    if (type === 'PENDING') {
      this.pendingTasks = tasks.map((item, index) => ({ ...item, sortedPosition: index }));
      this.completedTasks.filter(item => item.id !== task.id);
      this.tasks = [...this.pendingTasks, ...this.completedTasks];
    }
  }
}
