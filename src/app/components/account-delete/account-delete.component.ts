import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-delete',
  imports: [CommonModule],
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.css'
})
export class AccountDeleteComponent {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  // Component state
  readonly showDeleteConfirmation: WritableSignal<boolean> = signal(false);
  readonly deleteError: WritableSignal<boolean> = signal(false);
  readonly isDeleting: WritableSignal<boolean> = signal(false);
  
  openDeleteConfirmation(): void {
    this.showDeleteConfirmation.set(true);
    this.deleteError.set(false);
  }
  
  cancelDeleteAccount(): void {
    this.showDeleteConfirmation.set(false);
  }
  
  confirmDeleteAccount(): void {
    this.isDeleting.set(true);
    this.deleteError.set(false);
    
    this.accountService.deleteAccount().subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.router.navigate(['/']);
      },
      error: () => {
        this.isDeleting.set(false);
        this.deleteError.set(true);
      }
    });
  }
}
