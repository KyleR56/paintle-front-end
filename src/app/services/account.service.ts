import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

interface User {
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly http = inject(HttpClient);

  private readonly _id: WritableSignal<string | null> = signal(null);
  private readonly _username: WritableSignal<string | null> = signal(null);

  readonly id = this._id.asReadonly();
  readonly username = this._username.asReadonly();

  constructor() {

  }

  /**
  * Authenticates user with Google ID token and updates account state.
  * Returns an Observable that emits the authenticated account data.
  * 
  * @param idToken - The Google ID token received from sign-in
  * @returns Observable<User> that completes on successful authentication
  */
  public login(idToken: string): Observable<User> {
    return this.http.post<User>(
      'http://localhost:3000/auth/login',
      { idToken },
      { withCredentials: true }
    ).pipe(
      tap((res) => {
        this._id.set(res.id);
        this._username.set(res.username);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }
}
