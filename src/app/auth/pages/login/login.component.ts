import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  login():void {
    this.authService.login()
      .subscribe(response => {
        if (!response.id) {
          return;
        }

        this.router.navigate(['./heroes'])
      });
  }
}