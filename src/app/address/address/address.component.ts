import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/services/address/address.service';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  edit: FormGroup | any;
  submitted = false;
  constructor(
    private authService: AuthService,
    private addresServices:AddressService,
    private router:Router,
    private fb: FormBuilder
  ) { }
  adresse: string="";
  ville: string="";
  province: string="";
  pays: string="";
  U_pays: string="";
  id:any=0;
  liste: any = [];
  ngOnInit(): void {
    this.getAddress();
    this.edit = this.fb.group({
      adresse: [this.adresse, [Validators.required, Validators.maxLength(50)]],
      ville: [this.ville, [Validators.required, Validators.maxLength(50)]],
      province: [this.province, [Validators.required, Validators.maxLength(50)]],
      pays: [this.pays, [Validators.required, Validators.maxLength(50)]],
    });
  }
  makeDefault(values:any,item:any){
    console.log(values.currentTarget.checked);

    if(values.currentTarget.checked){
    this.authService.loadUser();

    var userId = this.authService.authenticatedUser.U_Id;
    var val = {
      Adr_Id:item.Adr_Id,

    };
    this.addresServices.editDefaultAddress(val,userId).subscribe((res:any) => {
      console.log(val);
      window.location.reload();

    });
  }

  }
  getAddress() {

    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    this.addresServices.getAddress(userId).subscribe((data: any) => {

      this.liste=data;
  });
  }
  delete(id:any){
    this.addresServices.removeAddress(id).subscribe(result => {
      alert(result.toString());
      window.location.reload();
    })
  }
  addPage(){
    this.router.navigate(['/address/add']);
  }
  get f() {
    return this.edit.controls;
  }
  getData(id:any,adresse:any,ville:any,province:any,pays:any){
    this.id=id;
    this.adresse=adresse;
    this.ville=ville;
    this.province=province;
    this.pays=pays;
    this.edit = this.fb.group({
      adresse: [this.adresse, [Validators.required, Validators.maxLength(50)]],
      ville: [this.ville, [Validators.required, Validators.maxLength(50)]],
      province: [this.province, [Validators.required, Validators.maxLength(50)]],
      pays: [this.pays, [Validators.required, Validators.maxLength(50)]],
    });

  }
  onSubmit(){
    this.authService.loadUser();
    var userId = this.authService.authenticatedUser.U_Id;
    var val = {
      Adr_Id:this.id,
      Adr_Name: this.edit.value.adresse,
      Adr_Ville:this.edit.value.ville,
      Adr_Province:this.edit.value.province,
      Adr_Pays:this.edit.value.pays,
      Adr_Default: false,
      User: userId,
    };
    this.addresServices.updateAddress(val).subscribe((res:any) => {
      console.log(res)
      this.authService.loadUser();

    });
     document.getElementById('exampleModal')?.click();
     window.location.reload();

  }
}

