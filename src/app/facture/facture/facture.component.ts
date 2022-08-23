import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
  providers :[DatePipe]
})
export class FactureComponent implements OnInit {

  constructor(
    private pdfservice: SharedService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
  ) { }
  isAuthentificated!: boolean;
  isAdmin!: boolean;
  date:any;
  factures: any = [];
  data:any;
  users:any=[];
  user:any;
  userStatus:any;
  orders : any =[];
  ListClient : any =[];
  ListSupplier : any =[];
  ListAdmin : any=[];
  allFactures :any=[];
  filterCondition:any;
  notFound! :boolean;
  name : any;
  factureByName: any=[];
  factureByDate:any=[];


  ngOnInit(): void {
    this.FactureList();
  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
 
  FactureList() { 
    this.isAuthentificated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin==true){
      this.pdfservice.getFacture().subscribe((data: any) => {
        this.factures = data;
        this.allFactures=this.factures;
        //clientList
        this.factures.forEach((element : any )=>{
          this.authService.getUserById(element.User).subscribe((user: any)=>{
            if(user[0].U_Client==true)
              {
              this.ListClient.push(element)
              }
          })
        })
       //supplierList
        this.factures.forEach((element : any )=>{
          this.authService.getUserById(element.User).subscribe((user: any)=>{
            if(user[0].U_Supplier==true)
               {
                this.ListSupplier.push(element)      
               }         
          })
        })
      //adminList
        this.factures.forEach((element : any )=>{
          this.authService.getUserById(element.User).subscribe((user: any)=>{
            if(user[0].U_Admin==true)
               {
                this.ListAdmin.push(element)
               }
          })
        })
      
      })
    }
    else{
        this.authService.loadUser();
        var userId = this.authService.authenticatedUser.U_Id;
        this.pdfservice.getFactureByUser(userId).subscribe((data: any) =>{
          this.factures = data;
          this.allFactures=this.factures;
        })
        }
      
  }
 details(id: any) {
    this.emitter.emit(id);
    this.router.navigate(['/facture/detailsPDF/', id]);
  }
  
  
statusClient(){
  this.allFactures=this.ListClient;
  console.log(this.ListClient)
 }
statusSupplier(){
  this.allFactures=this.ListSupplier;
 console.log(this.allFactures)
 }
statusAdmin(){
  this.allFactures=this.ListAdmin;
  console.log(this.ListAdmin)
 } 
searchByName(){
    this.factures=this.allFactures;
    this.notFound=true;
    this.allFactures=[];
    this.factureByName=[];
    if(this.name)  {
       this.factures.forEach((element : any )=>{
         this.authService.getUserById(element.User).subscribe((user: any)=>{
           if (user[0].U_FirstName==this.name)
             {this.factureByName.push(element);
             this.notFound=false
            }
         })
       })
       this.allFactures=this.factureByName;     
    }  
    else {
          this.notFound=true
          this.allFactures=[]
          this.ngOnInit()
    }
 }
searchByDate(){
  this.factures=this.allFactures;
  this.notFound=true;
  this.allFactures=[];
  this.factureByDate=[];
  if(this.date) {
      this.factures.forEach((element : any )=>{
         var createdAt = this.datePipe.transform(element.Create_at, 'yyyy-MM-dd');
         if(createdAt==this.date){
           this.factureByDate.push(element)
           this.notFound=false
         }
      })
      this.allFactures=this.factureByDate
  }
  else {
    this.notFound=true
    this.allFactures=[]
    this.ngOnInit()
  }

}
  

}
