import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading: boolean = false;

  constructor( 
    private authService: AuthService ,
    private router: Router
  ) { 

  }

  async onSubmit(form: any){
    this.isLoading = true;
    try{
    await this.authService.login(form.value.email, form.value.password);
    }catch(e){
      console.error(e);
      this.isLoading = false;
      return;
    }finally{
      this.isLoading = false;
    }
    this.router.navigate(['/']);
  }

}
