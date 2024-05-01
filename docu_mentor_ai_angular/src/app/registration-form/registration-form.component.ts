import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit{
  
  //registrationForm!: FormGroup;
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required), 
    password: new FormControl('', Validators.required)
  });
  registrationError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private AuthServiceService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.AuthServiceService.register(this.registrationForm.value)
    .subscribe(
      () => {
        // Handle successful registration
        console.log('Registration successful');
        // You can redirect to another page or display a success message
      },
      error => {
        // Handle registration error
        console.error('Registration error:', error);
        this.registrationError = error.message || 'Registration failed. Please try again.';
      }
    );
}  

}
