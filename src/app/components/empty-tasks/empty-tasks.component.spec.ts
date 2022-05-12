import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTasksComponent } from './empty-tasks.component';

describe('EmptyTasksComponent', () => {
  let component: EmptyTasksComponent;
  let fixture: ComponentFixture<EmptyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No tasks yet" text as empty state', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('No tasks yet');
  });
});
