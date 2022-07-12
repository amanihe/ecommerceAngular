import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  constructor(
    private service: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}
  reqAdmin: any = [];
  reqFnx: any = [];
  nbAdmin: any = 0;
  nbFnx: any = 0;
  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/auth/login']);
    }
   else{
    this.getRequest();}
  }
  getRequest() {
    this.authService.getAllRequest().subscribe((data) => {
      data.forEach((x: any) => {
        if (x.Req_Result == 1) {
          if (x.Req_Type === 'admin') {
            this.authService.getUserById(x.User).subscribe((data: any) => {
              this.reqAdmin.push(data);
              this.nbAdmin = data.length;
            });
          } else {
            this.authService.getUserById(x.User).subscribe((data: any) => {
              
              console.log(data);
              this.reqFnx.push(data);
              this.nbFnx = data.length;
            });
          }
        }
      });
    });
  }

  accept(rep: any, id: any) {
    this.authService.getUserById(id).subscribe((res: any) => {
      if (rep === 'admin') {
        var val1 = {
          Req_Type: 'admin',
          Req_Result: 2,
        };
       this.authService.updateRequest(val1, id).subscribe((res: any) => {
          console.log(res);
        });
        var val = {
          U_Id: id,
          U_FirstName: res[0].U_FirstName,
          U_LastName: res[0].U_LastName,
          U_Email: res[0].U_Email,
          U_Tel: res[0].U_Tel,
          U_Statut: res[0].U_Statut,
          U_Pwd: res[0].U_Pwd,
          U_Admin: true,
          U_Client: false,
          U_Supplier: false,
        };
        console.log(val)

        this.authService.updateUser(val).subscribe((res: any) => {
          console.log(res);
       });
        window.location.reload();
      } else {
        var val3 = {
          Req_Type: 'supplier',
          Req_Result: 2,
        };
        this.authService.updateRequest(val3, id).subscribe((res: any) => {
          console.log(res);
        });
        var val2 = {
          U_Id: id,
          U_FirstName: res[0].U_FirstName,
          U_LastName: res[0].U_LastName,
          U_Email: res[0].U_Email,
          U_Tel: res[0].U_Tel,
          U_Statut: res[0].U_Statut,
          U_Pwd: res[0].U_Pwd,
          U_Admin: false,
          U_Client: false,
          U_Supplier: true,
        };
        console.log(val2)
        this.authService.updateUser(val2).subscribe((res: any) => {
          console.log(res);
        });
        window.location.reload();
      }
    });
  }
  refus(rep: any, id: any) {
    if (rep === 'admin') {
      var val1 = {
        Req_Type: 'admin',
        Req_Result: 0,
      };
      this.authService.updateRequest(val1, id).subscribe((res: any) => {
        console.log(res);
      });

      window.location.reload();
    } else {
      var val3 = {
        Req_Type: 'supplier',
        Req_Result: 0,
      };
      this.authService.updateRequest(val3, id).subscribe((res: any) => {
        console.log(res);
      });

      window.location.reload();
    }
  }
}
