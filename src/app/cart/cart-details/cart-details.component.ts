import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router:Router
  ) { }
  FnxList:any=[];
  cartItem: any = [];
  products: any = [];
  cart: any = [];
  id: any;
  qte: any;
  ind:any=0;
  listToFnx:any=[];
  ordId:any
  total:any=0;
  tax:any=0;
  isAdmin:any=false
  ngOnInit(): void {
    this. refreshList();
    this.getCart();
    this.getSomme();
    this.isAdmin=this.authService.isAdmin()
  }
  refreshList() {
    this.authService.getFnx().subscribe((data) => {
      console.log(data)
      this.FnxList = data;
    });
  }
  affich(){


  }
  getSomme() {

    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.CartService.getOrder(userId).subscribe((data: any) => {
      // console.log(data)
      if (data.length!=0){
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
            //  this.products.push(prod);
              // console.log(this.cartItems)
            }
          );
        });
      }
      });
    }
    });

  }
  valider(){
    if(this.authService.isAdmin()){
      console.log(this.authService.authenticatedUser)
//this.CartService.sendEmail(this.authService.authenticatedUser).subscribe(data => {
  //alert(data.toString());

//})
var splitted:  any[]
var val : any={}
for ( var  i=0;i<this.products.length;i++){
splitted=[]
  var x=(<HTMLInputElement>document.getElementById('C'+i)).value
   splitted=x.split(" ", 4);
  console.log(splitted[0]);
  val={...val}
     val={
      OrdLign_Id: splitted[1],
      Order:this.ordId,
      Product: splitted[3],
      Ord_Qte: splitted[2],
      Supplier:splitted[0],
      OrdLign_Status:"envoyée"
    }
    this.CartService.updateOrderLigne(val).subscribe((res:any)=>{
      console.log(res)
    })
     var val2={
      Ord_Id:this.ordId,
      User: this.authService.authenticatedUser.U_Id,
      Ord_Type: 'admin',
      Ord_Status: 'envoyée',
     }
     this.CartService.updateOrder(val2).subscribe((res:any)=>{
      console.log(res)
    })
    console.log(val)
  this.authService.getUserById(splitted[0]).subscribe((user: any) => {
    user.forEach((x:any)=>{
      this.CartService.sendEmail(x).subscribe(data => {
        alert(data.toString());

      })
    })



  });
  //this.listToFnx[i]=splitted;
  alert("Commande envoyé")
  window.location.reload();
}

console.log(this.listToFnx);
    }
    else
   {
     this.router.navigate(['/checkout/first']);
    }
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
        this.ordId=data[0].Ord_Id
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
    if (ch == 'add')
     {qte += 1;
      this.qte = qte;
      this.editQte();}
    else if (ch == 'remove')
    {if(qte-1>0) {qte -= 1;
      this.qte = qte;
      this.editQte();}}


  //  console.log(this.qte);


  }
  editQte() {
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
