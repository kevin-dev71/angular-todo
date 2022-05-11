import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-header',
  templateUrl: './tasks-header.component.html',
  styleUrls: ['./tasks-header.component.scss'],
})
export class TasksHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() showAddButton: boolean = false;
  @Input() showGoBackButton: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
