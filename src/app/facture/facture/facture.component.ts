import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  constructor(
    private pdfservice: SharedService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  isAuthentificated!: boolean;
  isAdmin!: boolean;
  factures: any = [];
  data:any;
  users:any=[];
  user:any;
  userStatus:any;
  orders : any =[];
  allOrders : any =[];
  ListClient : any =[];
  ListSupplier : any =[];
  ListAdmin : any=[];
  allFactures :any=[];
  filterCondition:any;
  notFound! :boolean;
  searchedId : any;


  ngOnInit(): void {
    this.FactureList();
    this.ordersList();
  }
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
 
  FactureList() { 
    /*this.pdfservice.getFacture().subscribe((data: any) => {
      this.factures = data;
      console.log('data',this.factures)
      for (let i = 0; i < this.factures.length; i++ ) {
        this.pdfservice.getHistory(this.factures[i].order).subscribe((res:any)=>{
        console.log('res[0]',res[0].User);
        this.users.push(res[0].User);})}})
        console.table('users',this.users)
        console.log('length',this.users.length)
      /*for (let i = 0; i < this.users.length; i++ ){
        console.log('user[]',this.users[i])}
        //this.authService.getUserById(this.users[i]).subscribe((resultat: any)=>{
        //this.user=resultat;  
        //console.log('user',this.user)})}
        this.users.forEach((element: any)=>{
         (element: any) => console.log('element',element)})*/
      
      this.isAuthentificated = this.authService.isAuthenticated();
      this.isAdmin = this.authService.isAdmin();
      console.log('isAdmin===',this.isAdmin)
      if (this.isAdmin==true){
      this.pdfservice.getFacture().subscribe((data: any) => {
        this.factures = data;
        this.allFactures=this.factures;
        console.log('all',this.allFactures)
        console.log("factures",this.factures)
       //clientList
       this.factures.forEach((element : any )=>{
        this.authService.getUserById(element.User).subscribe((user: any)=>{
         if(user[0].U_Client==true)
         {
           this.ListClient.push(element)
           
         }
        
       })
     })
            console.log('tab',this.ListClient)
       //supplierList
            this.factures.forEach((element : any )=>{
              this.authService.getUserById(element.User).subscribe((user: any)=>{
               if(user[0].U_Supplier==true)
               {
                 this.ListSupplier.push(element)
                 
               }
               
             })
           })
           console.log('supp',this.ListSupplier)
      //adminList
      this.factures.forEach((element : any )=>{
        this.authService.getUserById(element.User).subscribe((user: any)=>{
         if(user[0].U_Admin==true)
         {
           this.ListAdmin.push(element)
           
         }
        
       })
     })
      
      });}
      else{
        this.authService.loadUser();
        var userId = this.authService.authenticatedUser.U_Id;
        console.log('userID',userId)
        this.pdfservice.getFactureByUser(userId).subscribe((data: any) => 
      {
        console.log('data',data);
        this.factures = data;
        this.allFactures=this.factures;
      })}
      
    }
    ordersList(){
      this.allFactures.forEach((element : any )=>{
        this.cartService.getOrderById(element.order).subscribe((order: any)=>{
          this.orders.push(order);
          this.allOrders=this.orders;
        })})
      
    }
  details(id: any) {
    console.log("test")
    this.emitter.emit(id);
    console.log('id',id);
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
 search(){
   
  if(this.searchedId)  {
    console.log('this.id',this.searchedId)
    console.log('date',new Date());
    this.allFactures=this.allFactures.filter((e:any)=> e.Fact_Id==Number(this.searchedId) )
    if (this.allFactures.length==0) this.notFound=true
    else this.notFound=false
    }
  else {this.notFound=false
    this.allFactures=[]};
  this.ngOnInit()
}
filter(){
  console.log('filter')
  switch (this.filterCondition) {
    case 'date':
      console.log('filterorders',this.orders)
      this.allOrders.sort((a:any,b:any)=> {
        console.log('a.date',a)
        console.log('b.date',b)
        new Date(a.date).getTime() - new Date(b.date).getTime()})
      break;
    case 'facture' :this.orders.sort((a:any,b:any)=> a.Ord_Id - b.Ord_Id);break;
    default:
      break;
  }
  this.ngOnInit() 
}

}
