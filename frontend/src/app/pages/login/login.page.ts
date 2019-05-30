import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit() {}
  /**
   * allows you to login
   */
  login() {
    this.authService.login();
  }
}
