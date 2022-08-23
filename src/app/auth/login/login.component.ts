import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log: FormGroup | any;
  submitted = false;
  constructor(private authService:AuthService,
    private CartService : CartService,
    private fb: FormBuilder,
    private router:Router) { }
  U_login: string = "";
  U_pwd: string = "";
  users:any;
  forget :boolean=false;
  

  ngOnInit(): void {
    this.authService.getUser().subscribe((data: any) => {
      this.users = data;
    })
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
    this.authService.login(user.username,user.password,this.users);  
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
    this.Signin(u);
    var x = this.authService.isAuthenticated();
    if(this.authService.isAuthenticated()){
      alert("vous êtes connecté");
      this.router.navigateByUrl('');
      window.location.reload();
    }
    else{
     alert("mot de passe ou email incorrect")
     this.forget=true
      
    }

  }

  sendMail(){
    var val={
      email:this.U_login,
    }
    console.log('test')
    console.log('ulogin',this.U_login)
    this.authService.getUserByEmail(val).subscribe((user: any) => {
    console.log('user',user)
        this.CartService.sendEmail(user).subscribe(data => {
          alert(data.toString());
         })
         this.router.navigate(['/auth/pwd'])
      })
  } 
}

