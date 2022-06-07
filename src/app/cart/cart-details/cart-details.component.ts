import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  item = [
    { image:"assets/packpc.jpg",
    nom : "télévision",
  prix : 15
    },
    { image:"assets/packpc.jpg",
      nom : "pack pc",
    prix : 15
    }
    ] ;
    liste2 = [
      { image:"assets/manette.jpg",
      nom : "télévision",
    prix : 15.25
      },
      { image:"assets/packpc.jpg",
        nom : "pack pc",
      prix : 17.55
      },
      {image:"assets/manette.jpg",
      nom : "téléphone",
    prix : 22.99
      },
      {image:"assets/packpc.jpg",
      nom : " unité de pc",
    prix : 9.98
      }
      ] ;
  vide: boolean=false;
  constructor(

    private CartService: CartService,
    private authService: AuthService
  ) { }
  cartItem: any = [];
  products: any = [];
  cart: any = [];
  id: any;
  qte: any;
  total:any=0;
  tax:any=0;
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {

    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.CartService.getOrder(userId).subscribe((data: any) => {
      // console.log(data)
      this.CartService.getOrderItem(data[0].Ord_Id).subscribe((items: any) => {
        this.cartItem = items;
        this.cartItem = items;
        if(this.cartItem.length==0){
          this.vide=true;
        }
        else{
        // console.log(this.cartItems)
        this.cartItem.forEach((element: any) => {

          // this.cart.push(element);
          this.CartService.getProduct(element.Product).subscribe(
            (prod: any) => {
              this.total+=parseInt(prod[0].Prod_Price)*element.Ord_Qte

              this.tax=this.total*0.04;
              prod['qte'] = element.Ord_Qte;
              prod['id'] = element.OrdLign_Id;
              this.products.push(prod);
              // console.log(this.cartItems)
            }
          );
        });
      }
      });
    });

  }
}
