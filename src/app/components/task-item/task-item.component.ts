import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';

import type { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() public task!: Task;
  @Output() public dispatchDeleteTask: EventEmitter<Task> = new EventEmitter();
  public faTimes = faTimes;

  constructor(private confirmationService: ConfirmationService) {}

  public onDelete(task: Task): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${this.task.text} Task?`,
      accept: () => {
        this.dispatchDeleteTask.emit(task);
      },
    });
  }

  get date(): string {
    return formatDate(new Date(this.task.day), 'yyyy-MM-dd', 'en-US');
  }
}
