import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'create',
    component: CreateEditComponent,
    data: {
      editMode: false,
    },
  },
  {
    path: 'edit/:id',
    component: CreateEditComponent,
    data: {
      editMode: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
