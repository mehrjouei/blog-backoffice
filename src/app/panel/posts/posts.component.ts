import { Component, OnInit, inject } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postsService = inject(PostsService);
  isLoadingResults = true;
  data$ = this.postsService.posts().pipe(
    startWith(),
    takeUntilDestroyed(),
    tap(() => (this.isLoadingResults = false))
  );
  displayedColumns = ['title','created_at','actions']

  ngOnInit(): void {}
}
