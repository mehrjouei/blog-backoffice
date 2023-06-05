import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Post } from '../interfaces/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  http = inject(HttpClient);
  constructor() {}

  posts() {
    return this.http.get<Post[]>(`${window.config.apiUrl}/posts`);
  }

  createPosts(title: string, content: string, image: string) {
    return this.http.post<Post[]>(`${window.config.apiUrl}/post`, {
      title,
      content,
      image,
    });
  }
}
