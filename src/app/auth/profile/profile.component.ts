import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { AuthService } from 'src/app/services/auth/authservice';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  edit: FormGroup | any;
  submitted = false;
  hideAdmin: boolean = false;
  hideFnx: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  userId: any = 0;
  pwd: string = '';
  UserNom: string = '';
  UserPrenom: string = '';
  UserEmail: string = '';
  UserTel: string = '';
  UserStatus: string = '';
  UserPwd: string = '';
  isClient: boolean = false;
  isAdmin: boolean = false;
  isFnx: boolean = false;
  adminAccept: boolean = false;
  adminRefus: boolean = false;
  adminAttente: boolean = false;
  fnxAccept: boolean = false;
  fnxRefus: boolean = false;
  fnxAttente: boolean = false;

  ngOnInit(): void {
    this.infoProfile();
    this.getRequest();
  }

  infoProfile() {
    this.authService.loadUser();
    this.userId = this.authService.authenticatedUser.U_Id;
    this.UserNom = this.authService.authenticatedUser.U_FirstName;
    this.UserPrenom = this.authService.authenticatedUser.U_LastName;
    this.UserEmail = this.authService.authenticatedUser.U_Email;
    this.UserTel = this.authService.authenticatedUser.U_Tel;
    this.UserStatus = this.authService.authenticatedUser.U_Statut;
    this.UserPwd = this.authService.authenticatedUser.U_Pwd;
    this.isAdmin = this.authService.authenticatedUser.U_Admin;
    this.isClient = this.authService.authenticatedUser.U_Client;
    this.isFnx = this.authService.authenticatedUser.U_Supplier;
    this.edit = this.fb.group({
      nom: [this.UserNom, [Validators.required, Validators.maxLength(50)]],
      prenom: [
        this.UserPrenom,
        [Validators.required, Validators.maxLength(50)],
      ],
      email: [this.UserEmail, [Validators.required, Validators.maxLength(50)]],
      tel: [this.UserTel, [Validators.required, Validators.maxLength(50)]],
      pwd: ['', [Validators.maxLength(50)]],
    });
  }
  get f() {
    return this.edit.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.edit.invalid) {
      return;
    }
    //changer mot de pass si saisir sinon rester le meme
    if (this.edit.value.pwd == '') {
      this.pwd = this.UserPwd;
    } else {
      this.pwd = this.edit.value.pwd;
    }
    console.log(this.pwd);
    var val = {
      U_Id: this.userId,
      U_FirstName: this.edit.value.nom,
      U_LastName: this.edit.value.prenom,
      U_Email: this.edit.value.email,
      U_Tel: this.edit.value.tel,
      U_Statut: this.UserStatus,
      U_Pwd: this.pwd,
      U_Admin: this.isAdmin,
      U_Client: this.isClient,
      U_Supplier: this.isFnx,
    };
    console.log(val);
    this.authService.updateUser(val).subscribe((res: any) => {
      console.log(res);
      this.authService.update(val);
      console.log(this.authService.authenticatedUser);
      this.authService.loadUser();
    });
    window.location.reload;
    document.getElementById('exampleModal')?.click();
    window.location.reload();
  }
  Demande(req: any) {
    console.log(req);
    console.log(this.hideFnx);
    var val = {
      User: this.userId,
      Req_Type: req,
      Req_Result: 1,
    };
    this.authService.demande(val).subscribe((result: any) => {});
    window.location.reload();
  }
  getRequest() {
    this.authService.loadUser();
    this.userId = this.authService.authenticatedUser.U_Id;
    this.authService.getRequest(this.userId).subscribe((result: any) => {
      console.log(result);
      result.forEach((x: any) => {
        console.log(this.adminAccept);
        console.log(this.adminRefus);
        console.log(this.fnxRefus);
        console.log(this.fnxAccept);
        this.hideFnx = false;
        this.hideAdmin = false;
        if (x.Req_Type == 'admin') {
          this.hideFnx = true;
          if (x.Req_Result == 1) {
            this.adminAttente = true;
          } else if (x.Req_Result == 2) {
            this.adminAttente = false;
            this.adminAccept = true;
          } else if (x.Req_Result == 0) {
            this.adminAttente = false;
            this.adminRefus = true;
          }
        } else if (x.Req_Type == 'supplier') {
          this.hideAdmin = true;
          if (x.Req_Result == 1) {
            this.fnxAttente = true;
          } else if (x.Req_Result == 2) {
            this.fnxAttente = false;
            this.fnxAccept = true;
          } else if (x.Req_Result == 0) {
            this.fnxAttente = false;
            this.fnxRefus = true;
          }
        }
      });
    });
  }
}
