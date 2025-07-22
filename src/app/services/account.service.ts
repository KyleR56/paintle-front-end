import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

export interface User  {
  id: string;
  username: string;
}

export interface UserResponse  {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly http = inject(HttpClient);

  private readonly _user: WritableSignal<User | null> = signal(null);

  readonly id: Signal<string | null> = computed(() => this._user()?.id ?? null);
  readonly username: Signal<string | null> = computed(() => this._user()?.username ?? null);

  constructor() {
  }

  /**
  * Authenticates user with Google ID token and updates account state.
  * Returns an Observable that emits the authenticated account data.
  * 
  * @param idToken - The Google ID token received from sign-in
  * @returns Observable<AuthResponse> that completes on successful authentication
  */
  public login(idToken: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      'https://paintle.net/api/auth/google',
      { idToken },
      {
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(
      tap((res) => {
        this._user.set(res.user);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  /**
   * Updates the user's username.
   * Returns an Observable that emits the updated user data.
   * 
   * @param newUsername - The new username to set
   * @returns Observable<User> that completes on successful update
   */
  public updateUsername(newUsername: string): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      'https://paintle.net/api/users/me',
      { username: newUsername },
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        this._user.set(res.user);
      }),
      catchError((error) => {
        console.error('Username update failed:', error);
        throw error;
      })
    );
  }

  /**
   * Signs out the current user by clearing local state and making a logout request to the server.
   * Redirects to the login page after successful logout.
   * 
   * @returns Observable<void> that completes on successful logout
   */
  public logout(): Observable<void> {
    return this.http.post<void>(
      'https://paintle.net/api/auth/logout',
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => {
        // Clear local state
        this._user.set(null);
      }),
      catchError((error) => {
        console.error('Logout failed:', error);
        // Even if the server request fails, clear local state
        this._user.set(null);
        throw error;
      })
    );
  }
}
