import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) {}
  reqAdmin: any = [];
  reqFnx: any = [];
  nbAdmin: any = 0;
  nbFnx: any = 0;
  ngOnInit(): void {
    this.getRequest();
  }
  getRequest() {
    this.service.getRequest().subscribe((data) => {
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
          U_Pwd: res[0].U_Pwd,
          U_Admin: true,
          U_Client: res[0].U_Client,
          U_Supplier: res[0].U_Supplier,
        };
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
          U_Pwd: res[0].U_Pwd,
          U_Admin: res[0].U_Admin,
          U_Client: res[0].U_Client,
          U_Supplier: true,
        };
        this.authService.updateUser(val2).subscribe((res: any) => {
          console.log(res);
        });
        window.location.reload();
      }
    });
  }
  refus(rep: any, id: any) {
    this.authService.getUserById(id).subscribe((res: any) => {
      if (rep === 'admin') {
        var val1 = {
          Req_Type: 'admin',
          Req_Result: 0,
        };
        this.authService.updateRequest(val1, id).subscribe((res: any) => {
          console.log(res);
        });
      } else {
        var val3 = {
          Req_Type: 'supplier',
          Req_Result: 0,
        };
        this.authService.updateRequest(val3, id).subscribe((res: any) => {
          console.log(res);
        });
      }
    });
    window.location.reload();
  }
}
