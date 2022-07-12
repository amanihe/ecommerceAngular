import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  name: string = '';
  isAuthentificated!: boolean;
  isAdmin!:boolean;
  isFnx!:boolean;
  ngOnInit(): void {
    this.authService.loadUser();
    this.name = this.authService.authenticatedUser.U_FirstName;
    this.isAuthentificated=this.authService.isAuthenticated();
    this.isAdmin=this.authService.isAdmin()
    this.isFnx=this.authService.isFnx()
  }

  logout() {
    this.authService.logout();
    window.location.reload;
    this.router.navigateByUrl('');
    this.showMePartially = false;
  }

  @Input() showMePartially: boolean | undefined;
}
