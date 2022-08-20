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
  users:any;
  

  ngOnInit(): void {
    this.authService.getUser().subscribe((data: any) => {
      console.log('getuser')
      this.users = data;
      console.log('users',this.users)})
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/P_Home']);
    }
    this.log=this.fb.group({
      login: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    }) 
   
  }
  get f()
   {
     return this.log.controls;
    }
  Signin(user:any){
    console.log('usersignin',user)
    console.log('this.users',this.users)
    this.authService.login(user.username,user.password,this.users);
    console.log('signinnnn')
    
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
    console.log('ttttttttttttt')
    // stop here if form is invalid
    this.Signin(u);
    var x = this.authService.isAuthenticated();
    console.log('x',x)
    console.log('testttt',this.authService.isAuthenticated())
    if(this.authService.isAuthenticated()){
      alert("vous êtes connecté");
      this.router.navigateByUrl('');
      window.location.reload();
    }
    else{
      alert("mot de passe ou email incorrect")
    }

  }
 /* onSubmit(){
    var u ={
      username:this.U_login,
      password:this.U_pwd
    }
    console.log('u',u)
    
    // stop here if form is invalid
    /*if (this.log.invalid) {
      return;
         }
         console.log('email',this.U_login)
         this.authService.login(this.U_login,this.U_pwd);
         console.log('auth',this.authService.isAuthenticated())
         if(this.authService.isAuthenticated()){
           alert("vous êtes connecté");
           this.router.navigateByUrl('');
           window.location.reload();
         }
         else{
           console.log('test incorrecte')
           alert("confirmer")
         }   
         if(this.authService.isAuthenticated()==false)  {
          console.log('test incorrecte')
          alert("confirmeggggggggggggr")
         }
  }*/


}

