import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public text!: string;
  @Input() public color!: string;
  @Output() public btnClick = new EventEmitter();

  constructor() {
    // ToDo
  }

  public onClick(): void {
    this.btnClick.emit();
  }
}
