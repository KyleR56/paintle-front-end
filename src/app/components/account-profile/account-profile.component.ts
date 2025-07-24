import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.css'
})
export class AccountProfileComponent {
  private readonly accountService = inject(AccountService);
  private readonly fb = inject(FormBuilder);
  
  readonly username = this.accountService.username;
  
  userForm!: FormGroup;

  // Component state
  readonly isEditing: WritableSignal<boolean> = signal(false);
  readonly isUpdating: WritableSignal<boolean> = signal(false);
  readonly updateSuccess: WritableSignal<boolean> = signal(false);
  readonly updateError: WritableSignal<boolean> = signal(false);
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.userForm = this.fb.group({
      username: [this.username(), [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }
  
  startEditing(): void {
    this.isEditing.set(true);
    this.updateSuccess.set(false);
    this.updateError.set(false);
  }
  
  cancelEditing(): void {
    this.isEditing.set(false);
    this.userForm.patchValue({
      username: this.username()
    });
  }
  
  saveChanges(): void {
    if (this.userForm.invalid) {
      return;
    }
    
    const newUsername = this.userForm.get('username')?.value;
    
    this.isUpdating.set(true);
    this.accountService.updateUsername(newUsername).subscribe({
      next: () => {
        this.isUpdating.set(false);
        this.isEditing.set(false);
        this.updateSuccess.set(true);
        setTimeout(() => this.updateSuccess.set(false), 3000);
      },
      error: () => {
        this.isUpdating.set(false);
        this.updateError.set(true);
        setTimeout(() => this.updateError.set(false), 3000);
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
