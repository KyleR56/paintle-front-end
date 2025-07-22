import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  
  readonly username = this.accountService.username;
  
  userForm!: FormGroup;
  isEditing = false;
  updateSuccess = false;
  updateError = false;
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.userForm = this.fb.group({
      username: [this.username(), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }
  
  startEditing(): void {
    this.isEditing = true;
    this.updateSuccess = false;
    this.updateError = false;
  }
  
  cancelEditing(): void {
    this.isEditing = false;
    this.userForm.patchValue({
      username: this.username()
    });
  }
  
  saveChanges(): void {
    if (this.userForm.invalid) {
      return;
    }
    
    const newUsername = this.userForm.get('username')?.value;
    
    this.accountService.updateUsername(newUsername).subscribe({
      next: () => {
        this.isEditing = false;
        this.updateSuccess = true;
        setTimeout(() => this.updateSuccess = false, 3000);
      },
      error: () => {
        this.updateError = true;
        setTimeout(() => this.updateError = false, 3000);
      }
    });
  }
  
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
  
  get usernameControl() {
    return this.userForm.get('username');
  }
  
  get usernameInvalid() {
    const control = this.usernameControl;
    return control?.invalid && (control?.dirty || control?.touched);
  }
}
