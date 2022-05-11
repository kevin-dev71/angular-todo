import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './components/add-task/add-task.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';

const routes: Routes = [
  { path: '', component: PendingTasksComponent },
  { path: 'add', component: AddTaskComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
