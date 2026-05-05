import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  onLogin() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.loginForm.valid) {
      if (username?.toLowerCase() === 'admin' && password === '1') {
        this.router.navigate(['/main'])
      } else {
        this._snackBar.open('User Not Found', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    }
  }
}
