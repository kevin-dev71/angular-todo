import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTasksComponent } from './empty-tasks.component';

describe('EmptyTasksComponent', () => {
  let component: EmptyTasksComponent;
  let fixture: ComponentFixture<EmptyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
