import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  fb = inject(FormBuilder);
  router = inject(Router);
  subscriptions = new Subscription();

  authService = inject(AuthService);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  submit() {
    this.subscriptions.add(
      this.authService
        .login(this.form.value.email!, this.form.value.password!)
        .subscribe((token) => {
          localStorage.setItem('token', token.token);
          this.router.navigateByUrl('/');
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
