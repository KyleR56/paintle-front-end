import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';

export const loginGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  
  if (accountService.id()) {
    // User is already logged in, redirect to account page
    router.navigate(['/account']);
    return false;
  }
  
  // User is not logged in, allow access to login page
  return true;
};
