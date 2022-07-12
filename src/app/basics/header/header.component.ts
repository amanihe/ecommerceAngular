import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,) { }
isFnx:any=false
authentificated:any=false
  ngOnInit(): void {
this.isFnx=this.authService.isFnx();
this.authentificated=this.authService.isAuthenticated();
  }

  showVar: boolean = false;

    toggleChild(){
        this.showVar = !this.showVar;
        console.log(this.showVar )
    }

}
