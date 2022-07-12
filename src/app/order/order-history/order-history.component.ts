import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  constructor(
    private CartService: CartService,
    private authService: AuthService
  ) {}
  orders: any = [];
  isOpen: boolean = false;
  ordersUser: any = [];
  orderUser: any = [];
  ordersAdmin: any = [];
  orderAdmin: any = [];
  isAdmin: any = [];
  isFnx: any = [];
  ordertest: any = [];
  total = 0;
  isLivred: any = false;
  isInshipping: any = false;
  isCreated: any = false;
  isPaid: any = false;
  ngOnInit(): void {
    this.getCart();
  }
  open() {
    this.isOpen = !this.isOpen;
  }
  getCart() {
    this.isAdmin = this.authService.isAdmin();
    this.isFnx = this.authService.isFnx();
    if (  !this.isFnx) {
      this.authService.loadUser();
      var userId = this.authService.authenticatedUser.U_Id;

      this.CartService.getOrderByUser(userId).subscribe((data: any) => {
        console.log(data);
        this.orders = [];

        data.forEach((x: any) => {
          this.CartService.getHistory(x.Ord_Id).subscribe((order: any) => {
            console.log(order[0]);
            order[1].forEach((i: any) => {
              
              console.log(i);
              this.total += parseInt(i.Prod_Price) * i.Ord_Qte;
              // order.push(this.total)
              // console.log(order)
            });
            this.isLivred = false;
            this.isInshipping = false;
            this.isCreated = false;
            this.isPaid = false;
            if (order[0].Ord_Status == 'livrée') {
              this.isLivred = true;
            }
            if (
              order[0].Ord_Status == 'en livraison' ||
              order[0].Ord_Status == 'livrée'
            ) {
              this.isInshipping = true;
            }
            if (
              order[0].Ord_Status == 'payée' ||
              order[0].Ord_Status == 'en livraison' ||
              order[0].Ord_Status == 'livrée'
            ) {
              this.isPaid = true;
            }
            if (
              order[0].Ord_Status == 'créée' ||
              order[0].Ord_Status == 'payée' ||
              order[0].Ord_Status == 'en livraison' ||
              order[0].Ord_Status == 'livrée'
            ) {
              this.isCreated = true;
            }
            order['isCreated'] = this.isCreated;
            order['isPaid'] = this.isPaid;
            order['isInshipping'] = this.isInshipping;
            order['islivred'] = this.isLivred;
            order['total'] = this.total;
            this.orders.push(order);
            console.log(this.orders);

            // this.total+=parseInt(prod[0].Prod_Price)*element.Ord_Qte
          });

          /*
         if(x.Ord_Type==='customer'){
          this.ordertest=[];
          console.log('tttttttttt');
        this.CartService.getOrderItem(x.Ord_Id).subscribe((items: any) => {


        /*  this.order['id']=x.Ord_Id;
          this.order['date']=x.Ord_Date;
          this.order['statut']=x.Ord_Status;//
          // console.log(this.cartItems)
          items.forEach((element: any) => {


           // console.log(element.Product);
            // this.cart.push(element);
            this.CartService.getProduct(element.Product).subscribe(
              (prod: any) => {
               // console.log(this.ordertest)
                this.ordertest=[...this.ordertest];
                console.log
               // console.log(this.order);
               prod['qte'] = element.Ord_Qte;
               this.ordertest.push(prod);
               console.log(this.ordertest);
               console.log('aaaa');
               this.order=this.ordertest
               // prod['qte'] = element.Ord_Qte;

              //  this.orderUser.push(x.Ord_Id)
         // this.orderUser.push(x.Ord_Date)
         // this.orderUser.push(x.Ord_Status)
           //     this.orderUser.push(x.Ord_Id)
           //    this.orderUser.push(prod);
               //console.log(this.orderUser)
              // this.ordersUser.push(this.ordersUser);
              }
            );

          });




        });

      console.log(this.order)
      }
      else{
        this.CartService.getOrderItem(x.Ord_Id).subscribe((items: any) => {

          this.ordersAdmin.push(this.orderUser)
          this.orderAdmin.push(x.Ord_Date)
          this.orderAdmin.push(x.Ord_Status)
          // console.log(this.cartItems)
          items.forEach((element: any) => {
           // console.log(element.Product);
            // this.cart.push(element);
            this.CartService.getProduct(element.Product).subscribe(
              (prod: any) => {
                prod['qte'] = element.Ord_Qte;
               this.orderAdmin.push(prod);
                // console.log(this.cartItems)
              }
            );
          });
        });

      }*/
        });
      });
    }
    //else if (this.isAdmin){

    //}
  }
}
