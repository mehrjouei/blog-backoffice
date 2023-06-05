import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'posts',
        loadChildren: () =>
          import('./posts/posts.module').then((m) => m.PostsModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
