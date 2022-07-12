import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isAdmin!: boolean;
  isAuthentificated!: boolean;
  hide:any=false
  constructor(
    private service: SharedService,
    private router: Router,
    private authService: AuthService
  ) { }
listCateg:any=[]
  ngOnInit(): void {
    this.refreshCategList()
  }
  refreshCategList() {
    this.service.getCategList().subscribe((data) => {
      this.listCateg = data;
      this.authService.loadUser();
      this.isAdmin=this.authService.isAdmin()
      this.isAuthentificated=this.authService.isAuthenticated();
    });
  }
  open(){
      this.hide=!this.hide
  }
  openProduct(id: any) {
    console.log(id)
    this.router.navigate(['/product/all/', id]);
  }
}
