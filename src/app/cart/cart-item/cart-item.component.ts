import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  vide: boolean=false;
  constructor(
    private CartService: CartService,
    private authService: AuthService
  ) {}
  cartItem: any = [];
  products: any = [];
  cart: any = [];
  id: any;
  qte: any;
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {

    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.CartService.getOrder(userId).subscribe((data: any) => {
       console.log(data.length)
       if(data.length==0){
        this.vide=true;
      }
      else{
      this.CartService.getOrderItem(data[0].Ord_Id).subscribe((items: any) => {

        this.cartItem = items;

        this.cartItem.forEach((element: any) => {
         // console.log(element.Product);
          // this.cart.push(element);
          this.CartService.getProduct(element.Product).subscribe(
            (prod: any) => {
              prod['qte'] = element.Ord_Qte;
              prod['id'] = element.OrdLign_Id;
              this.products.push(prod);


            }
          );

        });

      });
    }
      //console.log(this.cart);

    });

  }
  editclick(id: any, qte: any, ch: any) {
    this.id = id;
    if (ch == 'add') qte += 1;
    else if (ch == 'remove') qte -= 1;
    this.qte = qte;
    this.edit();
  //  console.log(this.qte);
  }
  edit() {
    var val = {
      Ord_Qte: this.qte,
    };
    //console.log(val);
    this.CartService.editQte(this.id, val).subscribe((data: any) => {
      console.log(data);
      window.location.reload();
    });
  }


  remove(id:any){
    this.CartService.removeOrderItem(id).subscribe(data => {
      alert(data.toString());
      window.location.reload();
    })
  }
}
