import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CredentialsModel} from '../models/credentials.model';
import {LocalStorageService} from 'ngx-localstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router,
              private storageService: LocalStorageService) { }

  private isLoggedIn = false;
  private localStorageKey = 'isLoggedIn';

  login(credentials: CredentialsModel): boolean {
    this.isLoggedIn = (credentials.username === 'admin' && credentials.password === 'admin');
    this.storageService.set(this.localStorageKey, this.isLoggedIn);
    return this.isLoggedIn;
  }

  logoutUser(): void{
    this.isLoggedIn = false;
    this.storageService.set(this.localStorageKey, this.isLoggedIn);
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    this.isLoggedIn = this.storageService.get(this.localStorageKey);
    return this.isLoggedIn;
  }
}
