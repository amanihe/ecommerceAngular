import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  addUser(val: any) {
    return this.http.post(this.APIUrl + '/user/', val);
  }

  demande(val:any){
    return this.http.post(this.APIUrl + '/request/', val);
  }


  public host:string="https://localhost:8443";
  public authenticated!: boolean;
  public authenticatedUser: any;
  private users: any = [];
  readonly APIUrl = 'http://127.0.0.1:8000';
  constructor(private http:HttpClient,private router: Router) {

   }


  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/user');
  }
  getFnx(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/supplier');

  }
  getUserById(id:any)
  {
    return this.http.get(this.APIUrl + '/userById/' + id);
  }
  updateUser(val: any): Observable<any> {
    return this.http.put(this.APIUrl + '/user/' + val.U_Id, val);
  }
  updateRequest(val: any,id:any): Observable<any> {
    return this.http.put(this.APIUrl + '/editrequest/' + id, val);
  }
  getRequest(id:any) {
    return this.http.get(this.APIUrl + '/userRequest/' + id);
  }
  getAllRequest(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/request');

  }


  login(username:string,password:string){
    this.getUser().subscribe((data: any) => {
      this.users = data;
    });
    let user;
    this.users.forEach((u:any)=>{
      if(u.U_Email===username && u.U_Pwd===password){
        user=u;
      }
    })
    if(user){
      this.authenticated=true;
      this.authenticatedUser=user;
      localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));
    }
    else{
      this.authenticated=false;
    }
  }
  loadUser(){
    let user=localStorage.getItem('authenticatedUser');
    if(user){
      this.authenticatedUser=JSON.parse(user);
      this.authenticated=true;
    }
  }
  update(user:any){
    this.authenticated=false;
    this.authenticatedUser=undefined;
    localStorage.removeItem('authenticatedUser');
    this.authenticatedUser=user;
    localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));

  }

  isAdmin(){
    if(this.authenticatedUser){
      return this.authenticatedUser.U_Admin==true;
    }
    else return false;
  }
  isFnx(){
    if(this.authenticatedUser){
      return this.authenticatedUser.U_Supplier==true;
    }
    else return false;
  }

  isAuthenticated(){
    return this.authenticated;
  }
  logout(){
    this.authenticated=false;
    this.authenticatedUser=undefined;
    localStorage.removeItem('authenticatedUser');
    this.router.navigateByUrl('/P_Home');

  }



}
