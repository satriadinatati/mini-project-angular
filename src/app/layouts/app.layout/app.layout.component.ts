import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app.layout',
  standalone: false,
  
  templateUrl: './app.layout.component.html',
  styleUrl: './app.layout.component.css'
})
export class AppLayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async logout(){
    await this.authService.logout();
    this.router.navigate(['auth/login']);
  }

}
