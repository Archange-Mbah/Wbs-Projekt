import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { register } from 'module';
import { CommonModule } from '@angular/common';

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

  username!:string;
  password!:string;
  errorMsg!:string;
  ispasswordValid!:boolean;
  loginForm!: FormGroup; // FormGroup is a class that tracks the value and validity state of a group of FormControl instances.
  isLoginMode!:boolean;

  constructor(
    private authService:AuthService, 
    private message:NzMessageService, 
    private fb:FormBuilder) {}

    ngOnInit(): void {
      this.isLoginMode = true;
      this.loginForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]], // Validators.required is a validator that requires a control to have a non-empty value.
        confirmPassword: [null, [Validators.required]]// Validators.required is a validator that requires a control to have a non-empty value.
      });
    }

    toggleLoginMode() {
      this.isLoginMode = !this.isLoginMode;
      this.loginForm.reset();
    }

   submitForm(): void {
    if(this.loginForm.invalid) {
      return;
    }
    if(this.isLoginMode) {
      this.login();
    }
    else {
      this.register();
    }

}

login(){
  const {username, password} = this.loginForm.value;
  this.authService.login(username, password).subscribe(
    res => {
      this.message.success('Logged in successfully');
    },
    err => {
      this.errorMsg = err.error.message;
    }
  );      
}


register(){
  const {username, password, confirmPassword} = this.loginForm.value;
  if(password !== confirmPassword) {
    this.errorMsg = 'Passwords do not match';
    return;
  }
  
  this.authService.register(username, password).subscribe(
    res => {
      this.message.success('Registered successfully');
    },
    err => {
      this.errorMsg = err.error.message;
    }
  );
}
}
