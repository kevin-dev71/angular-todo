import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageRefService } from './local-storage-ref.service';

import type { Task } from 'src/app/models/Task';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorage: Storage;
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  public tasks$ = this._tasks$.asObservable();

  constructor(private _localStorageRefService: LocalStorageRefService) {
    this.localStorage = this._localStorageRefService.localStorage;
  }

  setInfo(data: Task[]) {
    const jsonData = JSON.stringify(data);
    this.localStorage.setItem('tasks', jsonData);
    this._tasks$.next(data);
  }

  loadInfo() {
    const data = JSON.parse(this.localStorage.getItem('tasks') ?? '[]');
    this._tasks$.next(data);
  }

  clearInfo() {
    this.localStorage.removeItem('tasks');
    this._tasks$.next([]);
  }

  clearAllLocalStorage() {
    this.localStorage.clear();
    this._tasks$.next([]);
  }
}
