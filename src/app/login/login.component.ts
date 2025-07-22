import { AfterViewInit, Component, inject, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Router, RouterLink } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  private readonly ngZone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);
  
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '734078377877-396aoqt1e67fvmjvk691uovvsr6aua8h.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular'
      }
    );
  }

  handleCredentialResponse(response: any): void {
    this.ngZone.run(() => {
      const idToken = response.credential;
      
      // Clear any previous error and set loading state to true
      this.errorMessage.set(null);
      this.isLoading.set(true);
      
      // Subscribe to the login call to handle navigation
      this.accountService.login(idToken).subscribe({
        next: () => {
          // Navigate after successful login
          this.isLoading.set(false);
          this.router.navigate(['/account']);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Login failed:', error);
          this.errorMessage.set('Login failed. Please try again.');
        }
      });
    });
  }
}
