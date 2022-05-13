import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { of } from 'rxjs';
import { formatDate } from '@angular/common';

import type { Task } from '../models/Task';

describe('TaskService', () => {
  let service: TaskService;
  let serviceStub: Partial<TaskService>;
  const mockDateString = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  const mockTasksArr: Task[] = [
    {
      id: '1',
      text: 'Task 1',
      completed: false,
      day: mockDateString,
      sortedPosition: 0,
    },
    {
      id: '2',
      text: 'Task 2',
      completed: false,
      day: mockDateString,
      sortedPosition: 1,
    },
  ];

  const mockNewTask = {
    id: '3',
    text: 'Task 3',
    completed: false,
    day: mockDateString,
    sortedPosition: 2,
  };

  beforeEach(() => {
    serviceStub = {
      tasks: mockTasksArr,
      getTasks: () => of(serviceStub.tasks ?? []),
      addTask: (task: Task) => {
        serviceStub.tasks?.push(task);
      },
      deleteTask: (task: Task) => {
        serviceStub.tasks = serviceStub?.tasks?.filter(item => item.id !== task.id) ?? [];
        return of(serviceStub.tasks ?? []);
      },
      updateTask: (task: Task) => {
        serviceStub.tasks =
          serviceStub?.tasks?.map(item => (item.id === task.id ? { ...item, completed: !item.completed } : item)) ?? [];
        return of(serviceStub.tasks ?? []);
      },
    };

    TestBed.configureTestingModule({
      providers: [{ provide: TaskService, useValue: serviceStub }],
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of 2 tasks from an observable', () => {
    service.tasks = [...mockTasksArr];
    service.getTasks().subscribe(tasks => {
      expect(tasks).toBeDefined();
      expect(tasks.length).toBe(2);
    });
  });

  it('should return a list of 2 tasks from an observable, add 1 and return 3 task item', () => {
    service.tasks = [...mockTasksArr];

    expect(service.tasks.length).toBe(2);

    service.addTask(mockNewTask);

    service.getTasks().subscribe(tasks => {
      expect(tasks).toBeDefined();
      expect(tasks.length).toBe(3);
    });
  });

  it('should return a list of 2 tasks from an observable, then remove 1 and should have 1 task', () => {
    const taskToBeDeleted: Task = {
      id: '1',
      text: 'Task 1',
      completed: false,
      day: mockDateString,
      sortedPosition: 1,
    };
    service.tasks = [...mockTasksArr];

    service.deleteTask(taskToBeDeleted).subscribe(tasks => {
      expect(tasks).toBeDefined();
      expect(tasks.length).toBe(1);
    });
  });

  it('should return a list of 2 tasks from an observable, then update task with id 1 to completed: true', () => {
    const taskToBeUpdated: Task = {
      id: '1',
      text: 'Task 1',
      completed: false,
      day: mockDateString,
      sortedPosition: 1,
    };
    service.tasks = [...mockTasksArr];

    service.updateTask(taskToBeUpdated).subscribe(tasks => {
      expect(tasks).toBeDefined();
      expect(tasks.length).toBe(2);
      const foundUpdatedTask = tasks.find(task => task.id === taskToBeUpdated.id);
      expect(foundUpdatedTask?.completed).toBeTruthy();
    });
  });
});
