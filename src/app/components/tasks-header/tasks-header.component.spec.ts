import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksHeaderComponent } from './tasks-header.component';

describe('TasksHeaderComponent', () => {
  let component: TasksHeaderComponent;
  let fixture: ComponentFixture<TasksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
