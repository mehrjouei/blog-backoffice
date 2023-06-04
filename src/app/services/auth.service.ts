import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor() {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${window.config.apiUrl}/auth/login`,
      { email, password }
    );
  }
}
