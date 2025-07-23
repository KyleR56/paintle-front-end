import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AccountStatsComponent } from "../components/account-stats/account-stats.component";
import { AccountProfileComponent } from "../components/account-profile/account-profile.component";
import { AccountDeleteComponent } from "../components/account-delete/account-delete.component";
import { AccountHeaderComponent } from "../components/account-header/account-header.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AccountStatsComponent, AccountProfileComponent, AccountDeleteComponent, AccountHeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
}
