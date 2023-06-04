import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export function authenticationGuard(): CanActivateFn {
    return () => {
     const token = localStorage.getItem('token'); 
      if (token) {
        return true;
      }
      const router = inject(Router);
      router.navigateByUrl('/login');
      return false;
    };
  }