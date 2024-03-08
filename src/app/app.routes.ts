import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'polling',
      },
      {
        path: 'polling',
        loadComponent: () => import('./pages/polling-demo/polling-demo.component').then(m => m.PollingDemoComponent),
      },
      {
        path: 'sample',
        loadComponent: () => import('./pages/sample/sample.component').then(m => m.SampleComponent),
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
