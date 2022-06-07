import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    private service: SharedService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isAuthentificated!: boolean;
  isAdmin!: boolean;
  categProduct: any = [];
  products: any = [];
  liste: any = [];
  listImg: any = [];
  orders: any = [];
  ngOnInit(): void {
    this.refresh();
  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
  refresh() {
    this.isAuthentificated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.route.params.forEach((params: Params) => {
      if (params['id'] == -1) {
        this.refreshCategProductList();
      } else {
        if (params['id'] !== undefined) {
          let id = +params['id'];
          this.service.getProductByCateg(id).subscribe((data: any) => {
            this.products = data;
            console.log(this.products);
          });
        }
      }
    });
  }
  refreshCategProductList() {
    this.isAuthentificated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.service.getProduct().subscribe((data: any) => {
      this.products = data;
    }),
      this.service.getProductImg().subscribe((data) => {
        this.listImg = data;
      });
  }
  details(id: any) {
    this.emitter.emit(id);
    console.log(id);
    this.router.navigate(['/product/details/', id]);
  }

  Add_Order(l: any) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
    }
    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.service.getOrder(userId).subscribe((data: any) => {
      this.orders = data;
      var val1 = {};
      if (this.orders.length == 0) {
        console.log(this.orders.length);
        if (this.authService.isAdmin()) {
          val1 = {
            User: userId,
            Supplier: 1,
            Ord_Type: 'admin',
            Ord_Status: 'created',
          };
        } else {
          val1 = {
            User: userId,
            Supplier: 1,
            Ord_Type: 'customer',
            Ord_Status: 'created',
          };
        }
        this.service.addOrder(val1).subscribe((res: any) => {
          console.log(res.Ord_Id);

          var val2 = {
            Order: res.Ord_Id,
            Product: l,
            Ord_Qte: 1,
          };
          this.service.addOrderLign(val2).subscribe((result: any) => {
            console.log(result);
            this.router.navigateByUrl('/cart');
          });
        });
      } else {
        this.orders.forEach((o: any) => {
          if (o.Ord_Status === 'created') {
            var val = {
              Order: o.Ord_Id,
              Product: l,
              Ord_Qte: 1,
            };
            this.service.addOrderLign(val).subscribe((result: any) => {
              alert(result.toString());
              this.router.navigateByUrl('/cart');
            });
          } else {
            var val1={}
            if(this.authService.isAdmin()){
              val1 = {
                User: userId,
                Supplier: 1,
                Ord_Type: 'admin',
                Ord_Status: 'created',
              };
            }else{
             val1 = {
              User: userId,
              Supplier: 1,
              Ord_Type: 'customer',
              Ord_Status: 'created',
            };
          }
            this.service.addOrder(val1).subscribe((res: any) => {
              console.log(res.Ord_Id);

              var val2 = {
                Order: res.Ord_Id,
                Product: l,
                Ord_Qte: 16,
              };
              this.service.addOrderLign(val2).subscribe((result: any) => {
                console.log(result);
                this.router.navigateByUrl('/cart');
              });
            });
          }
        });
      }
    });
  }
}
