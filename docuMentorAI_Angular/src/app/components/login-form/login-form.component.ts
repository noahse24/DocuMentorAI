import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

  loginForm: FormGroup;
  isLoginMode = true;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: [''], email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.onSwitchMode(); // Initializes form with correct mode
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
        const { username, email, password } = this.loginForm.value;
        if (this.isLoginMode) {
            this.login(email, password);
        } else {
            this.register(username, email, password);
        }
    }
  }


  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
        next: (response) => {
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
            this.errorMessage = error.message;
        }
    });
  }
  
  register(username: string, email: string, password: string): void {
    this.authService.register(username, email, password).subscribe({
        next: (response) => {
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
            this.errorMessage = error.message;
        }
    });
  }


  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    if (!this.isLoginMode) {
      this.loginForm.get('username')?.setValidators([Validators.required]);
      this.loginForm.get('username')?.updateValueAndValidity();
    } else {
      this.loginForm.get('username')?.clearValidators();
      this.loginForm.get('username')?.updateValueAndValidity();
    }
}


handleResponse(): any {
  return {
    next: (response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
    }
  };
}

handleError(): any {
  return {
    error: (error: any) => {
      console.error('Authentication error', error);
      this.errorMessage = 'Failed to authenticate. Please check your credentials.';
    }
  };
}

}

