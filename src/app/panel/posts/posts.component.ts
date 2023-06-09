import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Observable, Subscription, startWith, tap } from 'rxjs';
import { Post } from 'src/app/interfaces/posts';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postsService = inject(PostsService);
  isLoadingResults = true;
  dialog = inject(MatDialog);
  subscriptions = new Subscription();
  data$: Observable<Post[]> | undefined;
  displayedColumns = ['title', 'created_at', 'actions'];

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.data$ = this.postsService.posts().pipe(
      startWith(),
      tap(() => (this.isLoadingResults = false))
    );
  }
  openRemoveDialog(row: Post) {
    this.subscriptions.add(
      this.dialog
        .open(RemoveDialogComponent, {
          width: '250px',
        })
        .afterClosed()
        .subscribe((answer) => {
          if (answer) {
            this.remove(row?._id!);
          }
        })
    );
  }

  remove(id: string) {
    this.subscriptions.add(
      this.postsService.removePost(id).subscribe(() => {
        this.loadPosts();
      })
    );
  }
}
