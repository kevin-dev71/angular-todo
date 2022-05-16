import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'angular-todo';
  constructor(private primengConfig: PrimeNGConfig) {}

  public ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
