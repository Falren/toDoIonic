import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TasksComponent } from '../app/components/tasks/tasks.component';
const routes: Routes = [
  { path: 'tasks',
    component: TasksComponent 
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
