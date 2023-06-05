import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnDestroy, OnInit {
  fb = inject(FormBuilder);
  postService = inject(PostsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  subscriptions = new Subscription();
  editMode = this.activatedRoute.snapshot.data['editMode'];
  postId = this.activatedRoute.snapshot.params['id'];
  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    image: [''],
  });

  ngOnInit(): void {
    if (this.editMode) {
      this.subscriptions.add(
        this.postService.getPostById(this.postId).subscribe((post) => {
          this.form.patchValue(post);
        })
      );
    }
  }

  add() {
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

  edit() {
    this.subscriptions.add(
      this.postService
        .editPosts(
          this.postId,
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
