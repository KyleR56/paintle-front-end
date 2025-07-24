import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-header',
  imports: [CommonModule],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.css'
})
export class AccountHeaderComponent {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  // Component state
  readonly isSigningOut: WritableSignal<boolean> = signal(false);

  signOut(): void {
    this.isSigningOut.set(true);
    this.accountService.logout().subscribe({
      next: () => {
        this.isSigningOut.set(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isSigningOut.set(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
