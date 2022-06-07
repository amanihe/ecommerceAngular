import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  vide: boolean=false;
  constructor(
    private CartService: CartService,
    private authService: AuthService,
    private addresServices:AddressService,
    private router:Router,
    private fb: FormBuilder
  ) { }
  DefaultAddress:any=[];
    Email:string="";
    Tel:string="";
    payement:boolean=false;
    total:any=0;
    tax:any=0;
  ngOnInit(): void {
    this.getAddress();
    this.getCart();
    this.Email=this.authService.authenticatedUser.U_Email;
    this.Tel=this.authService.authenticatedUser.U_Tel;
  }
  getAddress() {

    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.addresServices.getAddress(userId).subscribe((data: any) => {
      data.forEach((x:any)=>{
        if(x.Adr_Default==true){
          this.DefaultAddress=data;

        }

      })
      console.log(this.DefaultAddress)

  });
  }
  open(){
    this.payement=true;

  }
  getCart() {

    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.CartService.getOrder(userId).subscribe((data: any) => {
      this.CartService.getOrderItem(data[0].Ord_Id).subscribe((items: any) => {
        if(items.length==0){
          this.router.navigateByUrl('/cart');
        }
        else{
        items.forEach((element: any) => {
          this.CartService.getProduct(element.Product).subscribe(
            (prod: any) => {
              this.total+=parseInt(prod[0].Prod_Price)*element.Ord_Qte
              this.tax=this.total*0.04;
            }
          );
        });
      }
      });
    });

  }
}
