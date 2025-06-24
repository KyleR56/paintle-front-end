import { AfterViewInit, Component, inject, NgZone } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {
  private readonly ngZone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);

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
      
      // Subscribe to the login call to handle navigation
      this.accountService.login(idToken).subscribe({
        next: () => {
          // Navigate after successful login
          this.router.navigate(['/account']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    });
  }
}
