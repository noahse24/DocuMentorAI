import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

 //loginForm!: FormGroup;
loginForm: FormGroup = new FormGroup({
  email: new FormControl('', Validators.required), 
  password: new FormControl('', Validators.required)
});
  loginError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authServiceService: AuthServiceService
  ) { }

  login(credentials: { email: string; password: string }): void {
    this.authServiceService.login(credentials).subscribe({
      next: (response: any) => {
        // Store JWT token in local storage
        localStorage.setItem('token', response.token);
        // Optionally, redirect to a different page or perform other actions
      },
      error: (error: any) => {
        // Handle login error
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authServiceService.login(this.loginForm.value)
      .subscribe(
        () => {
          // Handle successful login
          console.log('Login successful');
          // You can redirect to another page or display a success message
        },
        error => {
          // Handle login error
          console.error('Login error:', error);
          this.loginError = error.message || 'Login failed. Please try again.';
        }
      );
  }
}
