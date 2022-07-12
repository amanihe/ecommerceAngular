import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/authservice';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  log: FormGroup | any;
  submitted = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private addresServices: AddressService
  ) {}
  data: any = [];
  U_nom: string = '';
  U_prenom: string = '';
  U_phone: string = '';
  U_email: string = '';
  U_pwd: string = '';
  U_adresse: string = '';
  U_ville: string = '';
  U_province: string = '';
  U_pays: string = '';
  U_statut: string = '';

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/P_Home']);
    }
    this.log = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      statut: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      pwd: ['', [Validators.required, Validators.maxLength(50)]],
      adresse: ['', [Validators.required, Validators.maxLength(50)]],
      ville: ['', [Validators.required, Validators.maxLength(50)]],
      province: ['', [Validators.required, Validators.maxLength(50)]],
      pays: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  get f() {
    return this.log.controls;
  }

  onSubmit() {

    this.Add_User();
  }

  Add_User() {
    var val = {
      U_FirstName: this.U_nom,
      U_LastName: this.U_prenom,
      U_Tel: this.U_phone,
      U_Statut: this.U_statut,
      U_Email: this.U_email,
      U_Pwd: this.U_pwd,
      U_Admin: false,
      U_Client: true,
      U_Supplier: false,
    };
    this.submitted = true;
    // stop here if form is invalid

    this.authService.addUser(val).subscribe((res: any) => {
      console.log(res);
      if (typeof res === 'string') {
        alert(res.toString());
      } else {
        var val2 = {
          Adr_Name: this.U_adresse,
          Adr_Ville: this.U_ville,
          Adr_Province: this.U_province,
          Adr_Pays: this.U_pays,
          Adr_Default: true,
          User: res.U_Id,
        };
        this.addresServices.addAddress(val2).subscribe((result: any) => {
          console.log(result);
          this.router.navigateByUrl('auth/login');
        });
      }
    });
  }
}
