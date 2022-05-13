import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { formatDate } from '@angular/common';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let mockDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [MessageService, ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = {
      id: '1',
      text: 'testing task',
      day: mockDate,
      completed: false,
      sortedPosition: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "testing task" as task text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('testing task');
  });

  it(`should contain ${mockDate} as task date`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const date = new Date(compiled.querySelector('p')?.textContent?.trim() ?? '');
    date.setDate(date.getDate() + 2);
    const formattedDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    expect(formattedDate).toContain(mockDate);
  });

  it(`should contain an icon for delete task`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('fa-icon')).toBeTruthy();
  });
});
