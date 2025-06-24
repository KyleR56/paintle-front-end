import { Component, inject } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  private readonly accountService = inject(AccountService);
  readonly username = this.accountService.username;
}
