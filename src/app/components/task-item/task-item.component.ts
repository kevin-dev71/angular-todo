import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { Task } from 'src/app/models/Task';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() dispatchDeleteTask: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  onDelete(task: Task) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${this.task.text} Task?`,
      accept: () => {
        this.dispatchDeleteTask.emit(task);
      },
    });
  }

  get date() {
    return formatDate(new Date(this.task.day), 'yyyy-MM-dd', 'en-US');
  }
}
