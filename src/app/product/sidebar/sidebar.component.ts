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
  productsdetail:any=[];
  table=[]
  hide:any=false;
  hide2:any=false;
  caracliste:any=[];
  detailliste:any=[];
  categ:boolean=false;
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

  openCarac(id:any){
    this.hide2=!this.hide2
    console.log(id);
    this.service. getdetailByCarac(id).subscribe((data:any)=>{
      this.detailliste=data;
      console.log(this.detailliste);

    })
  }
  opendetailProducts(id:any){
    
    this.service.get_caracProductByCarac(id).subscribe((data:any)=>{
this.productsdetail=data;
data.forEach((x:any) => {
 this.service.getProductById(x.Prod_Id).subscribe((data:any)=>{
   this.table=data;
   console.log(this.table)
 })
});
console.log(this.productsdetail);
    })
  }
  navigateproduct(id:any){
    console.log(id)
    this.router.navigate(['/product/all/', id]);
  }
  openProduct(id: any) {
    console.log(id)
    this.router.navigate(['/product/all/', id]);
    this.service.getcaracByCateg(id).subscribe((data:any)=>{
      this.caracliste=data;
      console.log(this.caracliste[0].Carecteristique);
     this.categ=true;
  

    })

  }
}
