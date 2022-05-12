import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFooterComponent } from './tasks-footer.component';

describe('TasksFooterComponent', () => {
  let component: TasksFooterComponent;
  let fixture: ComponentFixture<TasksFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text "Kevin © 2022"', () => {
    const fixture = TestBed.createComponent(TasksFooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')?.textContent).toContain('Kevin © 2022');
  });
});
