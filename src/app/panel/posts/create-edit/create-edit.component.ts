import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnDestroy {
  fb = inject(FormBuilder);
  postService = inject(PostsService);
  router = inject(Router);
  subscriptions = new Subscription();
  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    image: [''],
  });

  submit() {
    this.subscriptions.add(
      this.postService
        .createPosts(
          this.form.value.title!,
          this.form.value.content!,
          this.form.value.image!
        )
        .subscribe(() => {
          this.router.navigateByUrl('/posts');
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
