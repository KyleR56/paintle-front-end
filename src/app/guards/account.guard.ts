import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';

export const accountGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  
  if (!accountService.id()) {
    // User is not logged in, redirect to login page
    router.navigate(['/login']);
    return false;
  }
  
  // User is logged in, allow access to account page
  return true;
};
