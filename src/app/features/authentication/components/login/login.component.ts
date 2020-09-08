import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]]
    });
  }

  login(): void {
    const isLoggedIn = this.userService.login(this.formGroup.value);
    if (isLoggedIn) {
      this.router.navigate( ['notes']);
    } else {
      alert('Invalid credentials, try again');
    }
  }

}
