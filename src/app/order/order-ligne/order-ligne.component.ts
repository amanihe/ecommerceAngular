import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-order-ligne',
  templateUrl: './order-ligne.component.html',
  styleUrls: ['./order-ligne.component.css']
})
export class OrderLigneComponent implements OnInit {

  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService
  ) {}
  products: any = [];
  isOpen: boolean = false;
  ordersUser: any = [];
  orderUser: any = [];
  ordersAdmin: any = [];
  orderAdmin: any = [];
  ordertest: any = [];
  total=0
  isPayed:any=false;
  ngOnInit(): void {
    this.getCart();
  }
  open() {
    this.isOpen = !this.isOpen;
  }
  valide(){
    var splitted
    for(let i=0; i<this.products.length;i++){
      //var x=(<HTMLInputElement>document.getElementById('C1')).value
     // console.log(x)
     // console.log( this.orders['islivred'])
      var x=(<HTMLInputElement>document.getElementById('C'+[i])).value
      console.log(x)
    splitted=x.split(",", 3);
       console.log(splitted[1]);
       if (splitted!=[]){
       if (splitted[0]=="en livraison"||splitted[0]=="livrée"||splitted[0]=="payée"){


       var val={
        OrdLign_Status: splitted[0],
       }
       console.log(val)
       this.CartService.editStatus(splitted[1],val).subscribe((res:any)=>{
        console.log(res)
        
      })
     // window.location.reload();
    }}
    }
  }
  getCart() {
    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    console.log(userId);
    this.CartService.getAllOrderFnx(userId).subscribe((data: any) => {
      //console.log(data);
      //this.orders=[]
      data.forEach((x: any) => {
        //console.log(x.Ord_Type)
        this.service.getProductById(x.Product).subscribe((result:any)=>{
          //console.log(result[0]);
          this.isPayed=false;
          if (x.OrdLign_Status=='payée'){
            this.isPayed=true;
          }
          result[0]['isPayed']=this.isPayed
          result[0]['Qte']=x.Ord_Qte
          result[0]['LignId']=x.OrdLign_Id
          this.products.push(result[0])
        })
       console.log(this.products)
       /* if(x.Ord_Type="admin"){
        this.CartService.getHistory(x.Ord_Id).subscribe((order: any) => {
          console.log(order[0])


          order[1].forEach((i:any)=>{
            console.log(i)
            this.total+=parseInt(i.Prod_Price)*i.Ord_Qte

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

        });
}*/
      });
    });
  }
}
