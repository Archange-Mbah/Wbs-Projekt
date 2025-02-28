import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  username!: string;
  password!: string;
  errorMsg!: string;
  ispasswordValid!: boolean;
  loginForm!: FormGroup; // FormGroup to track form validity
  isLoginMode!: boolean;

  constructor(
    private authService: AuthService, 
    private message: NzMessageService, 
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoginMode = true;
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]], // Username is required
      password: [null, [Validators.required]], // Password is required
      confirmPassword: [null] // This will be used only in register mode
    });
  }

  toggleLoginMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset(); // Reset form fields when toggling modes
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      return; // Prevent submission if form is invalid
    }
    if (this.isLoginMode) {
      this.login(); // Call login method if in login mode
    } else {
      this.register(); // Call register method if in register mode
    }
  }

  login() {
    const { username, password } = this.loginForm.value; // Extract username and password from form
    this.authService.login(username, password).subscribe(
      res => {
        this.message.success('Logged in successfully');
        this.router.navigateByUrl('/dashboard'); // Navigate to dashboard after successful login
      },
      err => {
        this.errorMsg = err.error.message || 'Login failed'; // Set error message if login fails
      }
    );      
  }

  register() {
    const { username, password, confirmPassword } = this.loginForm.value;
    if (password !== confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    this.authService.register(username, password).subscribe(
      res => {
        this.message.success('Registered successfully');
        this.router.navigateByUrl('/dashboard'); // Navigate to dashboard after successful registration
      },
      err => {
        this.errorMsg = err.error.message || 'Registration failed'; // Set error message if registration fails
      }
    );
  }
}
