import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any=[];

  constructor(private authService: AuthService,private router: Router,
    private service: SharedService,
    private route: ActivatedRoute) { }
    liste: any = [];
    listImg: any = [];
    orders:any=[];
    userId:any=0
    isAdmin:any=false;

  ngOnInit(): void {
this.isAdmin=this.authService.isAdmin();
    this.refresh();
    this.userId = this.authService.authenticatedUser.U_Id;
  }

  Add_Order(l:any) {
    this.authService.loadUser()
    var userId = this.authService.authenticatedUser.U_Id;
    this.service.getOrder(userId).subscribe((data: any) => {
      this.orders = data;

    if ( this.orders.length==0 ){
      console.log(this.orders.length)
      var val1 = {
        User: userId,
        Ord_Type: "customer",
        Ord_Status: "créée",

      };
      this.service.addOrder(val1).subscribe((res:any) => {
        console.log(res.Ord_Id);

        var val2 = {
          Order: res.Ord_Id,
          Product: l,
          Ord_Qte: 16,
          Supplier:null,
          OrdLign_Status:"créée",
          sousOrder:null,
          real_delivery_date:null
        };
        this.service.addOrderLign(val2).subscribe((result:any) => {
          console.log(result);
          this.router.navigateByUrl('/cart');
        });


      });
    }
else{
    this.orders.forEach((o:any)=>{

      if(o.Ord_Status==="créée" ){


          var val = {
            Order: o.Ord_Id,
            Product: l,
            Ord_Qte: 1,
            Supplier:null,
            OrdLign_Status:"créée",
            sousOrder:null,
            real_delivery_date:null
          };
          this.service.addOrderLign(val).subscribe((result:any) => {
            alert(result.toString());
            this.router.navigateByUrl('/cart');
          });

      }
      else{
        var val1 = {
          User: userId,
          Ord_Type: "customer",
          Ord_Status: "créée",

        };
        this.service.addOrder(val1).subscribe((res:any) => {
          console.log(res.Ord_Id);

          var val2 = {
            Order: res.Ord_Id,
            Product: l,
            Ord_Qte: 16,
            Supplier:null,
            OrdLign_Status:"créée",
            sousOrder:null,
            real_delivery_date:null
          };
          this.service.addOrderLign(val2).subscribe((result:any) => {
            console.log(result);
            this.router.navigateByUrl('/cart');
          });


        });
      }


});
}
});
  }
  refresh(){
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.service.getProductById(id)
        .subscribe((data: any) => {
          this.product = data;
          console.log(this.product)
    })}
    });
  }
}
