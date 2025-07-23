import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-header',
  imports: [],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.css'
})
export class AccountHeaderComponent {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  signOut(): void {
    this.accountService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
