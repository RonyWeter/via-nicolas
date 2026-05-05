import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./base/base.module').then(m => m.BaseModule),
  },
  {
    path: 'main',
    component: MainComponent,
    // canActivate: [MainAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
