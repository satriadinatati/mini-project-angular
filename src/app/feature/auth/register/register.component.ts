import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async onSubmit(){
    this.registerForm.markAllAsTouched();
    if(this.registerForm.controls['password'].value !== this.registerForm.controls['passwordConfirmation'].value){
      this.registerForm.controls['passwordConfirmation'].setErrors({ notMatch: true });
      this.registerForm.markAllAsTouched();
      return;
    }
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    await this.authService.register(this.registerForm.value.email!, this.registerForm.value.password!);
    this.router.navigate(['/auth/login']);

  }

}
