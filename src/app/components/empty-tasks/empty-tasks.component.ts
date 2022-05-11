import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-tasks',
  templateUrl: './empty-tasks.component.html',
  styleUrls: ['./empty-tasks.component.scss'],
})
export class EmptyTasksComponent implements OnInit {
  @Input() text: string = 'No tasks yet';
  constructor() {}

  ngOnInit(): void {}
}
