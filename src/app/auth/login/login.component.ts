import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log: FormGroup | any;
  submitted = false;
  constructor(private authService:AuthService,private fb: FormBuilder,private router:Router) { }
  U_login: string = "";
  U_pwd: string = "";

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/P_Home']);
    }
    this.log = this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }
  get f()
   {
     return this.log.controls;
    }
  Signin(user:any){
    this.authService.login(user.username,user.password);
    if(this.authService.isAuthenticated()){
      alert("connected");
      this.router.navigateByUrl('');
      window.location.reload();
    }

  }
  getuser(){
    this.authService.loadUser()
    console.log(this.authService.authenticatedUser.U_Id);
  }
  onSubmit() {
    var u ={
      username:this.U_login,
      password:this.U_pwd
    }
    this.submitted = true;
    // stop here if form is invalid
    if (this.log.invalid) {
      return;
    }
    this.Signin(u);
  }

}

