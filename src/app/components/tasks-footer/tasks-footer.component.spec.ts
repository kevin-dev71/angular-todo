import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFooterComponent } from './tasks-footer.component';

describe('TasksFooterComponent', () => {
  let component: TasksFooterComponent;
  let fixture: ComponentFixture<TasksFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
