import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonTaskItemComponent } from './skeleton-task-item.component';

describe('SkeletonTaskItemComponent', () => {
  let component: SkeletonTaskItemComponent;
  let fixture: ComponentFixture<SkeletonTaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonTaskItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a skeleton loading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-skeleton-task-item')).toBeTruthy();
  });
});
