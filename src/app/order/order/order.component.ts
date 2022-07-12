import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
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
  ordertest: any = [];
  total=0
  isLivred:any=false;
  ngOnInit(): void {
    this.getCart();
  }
  open() {
    this.isOpen = !this.isOpen;
  }
  valide(){
    var splitted
    for(let i=0; i<this.orders.length;i++){
      /*var x=(<HTMLInputElement>document.getElementById('C1')).value
      console.log(x)*/
     // console.log( this.orders['islivred'])
      var x=(<HTMLInputElement>document.getElementById('C'+[i])).value
      console.log(x)
    splitted=x.split(",", 3);
       console.log(splitted);
       if (splitted!=[]){
       if (splitted[0]=="en livraison"||splitted[0]=="livrée"){


       var val2={
        Ord_Id:splitted[1],
        User:  splitted[2],
        Ord_Type: 'customer',
        Ord_Status: splitted[0],
       }
       console.log(val2)
       this.CartService.updateOrder(val2).subscribe((res:any)=>{
        console.log(res)
      })
      window.location.reload();
    }}
    }
  }
  getCart() {
    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.CartService.getAllOrder().subscribe((data: any) => {
      console.log(data);
      this.orders=[]
      data.forEach((x: any) => {
        console.log(x.Ord_Type)
        if(x.Ord_Type="customer"){
        this.CartService.getHistory(x.Ord_Id).subscribe((order: any) => {
          console.log(order[0])

        //  if ((order[0].Ord_Type=='customer')){
          order[1].forEach((i:any)=>{
            console.log(i)
            this.total+=parseInt(i.Prod_Price)*i.Ord_Qte
           // order.push(this.total)
           // console.log(order)
          });
          this.isLivred=false;
          if (order[0].Ord_Status=='livrée')
          {
            this.isLivred=true;

          }
          order['islivred']=this.isLivred
          order['total']=this.total
          this.orders.push(order)
          console.log(this.orders)
        //}
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

      }*/}
      });
    });
  }
}
