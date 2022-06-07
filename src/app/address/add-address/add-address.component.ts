import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit {
  log: FormGroup | any;
  submitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private addresServices: AddressService
  ) {}
  data: any = [];
  U_adresse: string = '';
  U_ville: string = '';
  U_province: string = '';
  U_pays: string = '';
  ngOnInit(): void {
    this.log = this.fb.group({
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
    this.AddAddrss();
  }
  AddAddrss() {
    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    var val2 = {
      Adr_Name: this.U_adresse,
      Adr_Ville: this.U_ville,
      Adr_Province: this.U_province,
      Adr_Pays: this.U_pays,
      Adr_Default: false,
      User: userId,
    };
    this.addresServices.addAddress(val2).subscribe((result: any) => {
      alert(result.toString());
    });
    this.router.navigate(['/address/book']);
  }
}
