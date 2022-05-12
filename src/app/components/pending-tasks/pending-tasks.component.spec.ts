import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PendingTasksComponent } from './pending-tasks.component';
import { TasksHeaderComponent } from 'src/app/components/tasks-header/tasks-header.component';

import { formatDate } from '@angular/common';

import type { Task } from 'src/app/models/Task';

describe('PendingTasksComponent', () => {
  let component: PendingTasksComponent;
  let fixture: ComponentFixture<PendingTasksComponent>;
  const mockDateString = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  const mockTasksArr: Task[] = [
    {
      id: '1',
      text: 'Task 1',
      completed: false,
      day: mockDateString,
    },
    {
      id: '2',
      text: 'Task 2',
      completed: false,
      day: mockDateString,
    },
  ];

  const mockCompletedTasksArr: Task[] = [
    {
      id: '1',
      text: 'Task 1',
      completed: true,
      day: mockDateString,
    },
    {
      id: '2',
      text: 'Task 2',
      completed: true,
      day: mockDateString,
    },
  ];

  beforeEach(async () => {
    // serviceStub = {
    //   getPendingTasks: () => of(mockTasksArr),
    // };

    await TestBed.configureTestingModule({
      imports: [DragDropModule],
      declarations: [PendingTasksComponent, TasksHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Pending tasks and Completed Tasks Section"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const [pendingTasksDiv, completedTasksDiv] = Array.from(
      compiled.querySelectorAll('div .example-container')
    ) as HTMLElement[];
    expect(pendingTasksDiv.querySelector('h2')?.textContent).toContain('Pending tasks');
    expect(completedTasksDiv.querySelector('h2')?.textContent).toContain('Completed tasks');
  });

  it('should contain a list of 2 pending tasks', () => {
    component.pendingTasks = mockTasksArr;
    component.showEmptyStateForPendingTasks = false;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const [pendingTasksDiv, completedTasksDiv] = Array.from(
      compiled.querySelectorAll('div .example-container')
    ) as HTMLElement[];
    expect(pendingTasksDiv.querySelectorAll('app-task-item.task.pending').length).toBe(2);
  });

  it('should contain a list of 2 completed tasks', () => {
    component.completedTasks = mockCompletedTasksArr;
    component.showEmptyStateForCompletedTasks = false;

    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const [pendingTasksDiv, completedTasksDiv] = Array.from(
      compiled.querySelectorAll('div .example-container')
    ) as HTMLElement[];
    expect(completedTasksDiv.querySelectorAll('app-task-item.task.completed').length).toBe(2);
  });

  it('should contain a list of 2 completed tasks and a list of 2 pending tasks', () => {
    component.completedTasks = mockCompletedTasksArr;
    component.pendingTasks = mockTasksArr;

    component.showEmptyStateForPendingTasks = false;
    component.showEmptyStateForCompletedTasks = false;

    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    const [pendingTasksDiv, completedTasksDiv] = Array.from(
      compiled.querySelectorAll('div .example-container')
    ) as HTMLElement[];
    expect(completedTasksDiv.querySelectorAll('app-task-item.task.completed').length).toBe(2);
    expect(pendingTasksDiv.querySelectorAll('app-task-item.task.pending').length).toBe(2);
  });
});
