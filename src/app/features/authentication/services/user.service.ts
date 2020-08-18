import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from '../model/credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) { }
  private isLoggedIn = false;

  login(credentials: Credentials): boolean {
    this.isLoggedIn = (credentials.username === 'admin' && credentials.password === 'admin');
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
    return this.isLoggedIn;
  }

  logoutUser(): void{
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    return this.isLoggedIn;
  }
}
