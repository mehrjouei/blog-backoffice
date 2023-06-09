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

  getPostById(id: string) {
    return this.http.get<Post>(`${window.config.apiUrl}/post/${id}`);
  }

  createPosts(title: string, content: string, image: string) {
    return this.http.post<Post[]>(`${window.config.apiUrl}/post`, {
      title,
      content,
      image,
    });
  }

  editPosts(id: string, title: string, content: string, image: string) {
    return this.http.patch<Post[]>(`${window.config.apiUrl}/post/${id}`, {
      title,
      content,
      image,
    });
  }

  removePost(id: string) {
    return this.http.delete<Post>(`${window.config.apiUrl}/post/${id}`);
  }
}
