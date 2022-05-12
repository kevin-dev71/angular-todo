import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TasksHeaderComponent } from './tasks-header.component';

describe('TasksHeaderComponent', () => {
  let component: TasksHeaderComponent;
  let fixture: ComponentFixture<TasksHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TasksHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksHeaderComponent);
    component = fixture.componentInstance;
    component.title = 'My Tasks';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a "My Tasks" as title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('My Tasks');
  });

  it('should render a "Add Task" button when "showAddButton" is true and contain redirect link to "add"', () => {
    component.showAddButton = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const btnEl = compiled.querySelector('.p-button-success');
    expect(btnEl).toBeTruthy();
    expect(btnEl?.hasAttribute('label')).toBeTruthy();
    expect(btnEl?.getAttribute('label')).toContain('Add Task');
    expect(btnEl?.getAttribute('ng-reflect-router-link')).toEqual('add');
  });

  it('should render a "Go Back" button when "showGoBackButton" is true and contain redirect link to "/"', () => {
    component.showGoBackButton = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const btnEl = compiled.querySelector('.p-button-secondary');
    expect(btnEl).toBeTruthy();
    expect(btnEl?.getAttribute('label')).toContain('Go Back');
    expect(btnEl?.getAttribute('ng-reflect-router-link')).toEqual('/');
  });
});
