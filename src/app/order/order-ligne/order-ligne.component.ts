import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/authservice';
import { CartService } from 'src/app/services/cart/cart.service';
import { SharedService } from 'src/app/services/shared.service';


//drag and drop
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-order-ligne',
  templateUrl: './order-ligne.component.html',
  styleUrls: ['./order-ligne.component.css']
})
export class OrderLigneComponent implements OnInit {

  constructor(private CartService: CartService,
    private authService: AuthService,
    private service:SharedService
  ) {}
  products: any = [];
  isOpen: boolean = false;
  ordersUser: any = [];
  orderUser: any = [];
  ordersAdmin: any = [];
  orderAdmin: any = [];
  ordertest: any = [];
  total=0
  orders:any[]=[];
  isPayed:any=false;
  isChecked:any=false;
  ordToShow:any={isOpen:false}
  searchedId:any=''
  newId:any={sousOrder:0}
  ngOnInit(): void {
  this.getCart();
   
  
  }
  open(id:any) {
    
    let index=this.orders.findIndex((x:any)=> x.ord_id==id);
    this.orders[index].isOpen=!this.orders[index].isOpen
  
  }
  filter(){
  
    this.filterProducts();
    this.ngOnInit() 
  }
  
  search(){

    if(this.searchedId)  this.searchId();
    else this.products=[];
    this.ngOnInit()
  }

  valide(){
  this.orders.forEach((ord:any)=>{
    ord.prods.forEach((prod:any)=>{
      if((prod.status=='payée')||(prod.status=='livrée')||(prod.status=='livrée')){
        var val={
          OrdLign_Status: prod.status,
         }
         console.log(val)
         this.CartService.editStatus(prod.LignId,val).subscribe((res:any)=>{
          console.log(res)
          
        })
      }
      if(prod.expected_delivery_date!=''){
        console.log(this.orders)
        let index=ord.sousOrders.findIndex((x:any)=>{
          var d1=new Date(x.expected_delivery_date);
          var d2=new Date(prod.expected_delivery_date);
          return d1.getTime()==d2.getTime();
        });
        if(index!=-1){
          var val1={
            sousOrder:ord.sousOrders[index].SousOrd_Id,
          }
          this.CartService.updateOrdLingeSousOrdId(prod.LignId,val1).subscribe((res:any)=>{})
        }
        else{
          var val2={
            Ord_Id:ord.ord_id,
            expected_delivery_date:prod.expected_delivery_date,
            SousOrd_status:prod.status
          }
          
          this.CartService.creatsousOrder(val2).subscribe((res:any)=>{
           console.log("res=",res)
           this.newId.sousOrder=res.SousOrd_Id;
           this.CartService.updateOrdLingeSousOrdId(prod.LignId,this.newId).subscribe((res2:any)=>{

           })
          
      
          })
          
        }
      }
      else{
        this.newId.sousOrder=null;
        this.CartService.updateOrdLingeSousOrdId(prod.LignId,this.newId).subscribe((res2:any)=>{})
      }
    })

if((ord.status=='payée')||(ord.status=='livrée')||(ord.status=='en livraison')){
  var valO={
    Ord_Status:ord.status
  }
  this.CartService.updateOrderbyId(ord.ord_id,valO).subscribe((res:any)=>{})
  ord.prods.forEach((prod:any)=>{
    var valP={
      OrdLign_Status:ord.status
    }
    this.CartService.editStatus(prod.LignId,valP).subscribe((res:any)=>{
      prod.status=ord.status
    })
  })
  ord.sousOrders.forEach((sousOrd:any)=>{
    var valSO={
      SousOrd_status:ord.status
    }
    this.CartService.updateSousOrdStatus(sousOrd.SousOrd_Id,valSO).subscribe((res:any)=>{
      sousOrd.SousOrd_status=ord.status;
    })
    sousOrd.prods.forEach((prod:any)=>{
      var valP={
        OrdLign_Status:ord.status
      }
      this.CartService.editStatus(prod.LignId,valP).subscribe((res:any)=>{
        prod.status=ord.status
      })
    })
  })
}else{
  valO={
    Ord_Status:'envoyée'
  }
  this.CartService.updateOrderbyId(ord.ord_id,valO).subscribe((res:any)=>{})
  ord.sousOrders.forEach((sousOrd:any)=>{
    if((sousOrd.SousOrd_status=='payée')||(sousOrd.SousOrd_status=='livrée')||(sousOrd.SousOrd_status=='en livraison')){
      var valSO={
        SousOrd_status:sousOrd.SousOrd_status
      }
      this.CartService.updateSousOrdStatus(sousOrd.SousOrd_Id,valSO).subscribe((res:any)=>{})
      sousOrd.prods.forEach((prod:any)=>{
        var valP={
          OrdLign_Status:sousOrd.SousOrd_status
        }
        this.CartService.editStatus(prod.LignId,valP).subscribe((res:any)=>{
          prod.status=sousOrd.SousOrd_status
        })
      })
    }
    else{
      valSO={
        SousOrd_status:'envoyée'
      }
      this.CartService.updateSousOrdStatus(sousOrd.SousOrd_Id,valSO).subscribe((res:any)=>{})
      sousOrd.prods.forEach((prod:any)=>{
        var valP={
          OrdLign_Status:prod.status
        }
        this.CartService.editStatus(prod.LignId,valP).subscribe((res:any)=>{})
      })
    }
  })
}

  })

  }

  drop(event: CdkDragDrop<any>,id:any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    var index=this.orders.findIndex((x:any)=> x.ord_id==id);

console.log(event)
let numberOfSatatus=0
        
this.orders[index].statusTable.forEach((status:any)=>{
 if(status.info.includes(0)) numberOfSatatus++
})

if(numberOfSatatus==1) {this.orders[index].statusTable.forEach((status:any)=>{
   if(status.info.includes(0)) {
    this.orders[index].status=status.status;
    this.changeOnSelectOrd(this.orders[index].ord_id)
 
 }})

};
   
  }

   
  filterProducts(){
    this.products=this.products.sort((a:any,b:any)=> new Date(a.date).getTime() - new Date(b.date).getTime())
  }
  searchId(){

  this.products=this.products.filter((e:any)=> e.LignId==Number(this.searchedId) )
  console.log('search=',this.products)
  }



  changeOnSelectOrd(id:any){
    var index=this.orders.findIndex((x:any)=> x.ord_id==id)
    this.orders[index].prods.forEach((prod:any)=>{
      prod.status=this.orders[index].status
    })
    this.orders[index].sousOrders.forEach((sousOrd:any)=>{
      sousOrd.SousOrd_status=this.orders[index].status
      sousOrd.prods.forEach((prod:any)=>{
        prod.status=this.orders[index].status
      })
    })
    this.refrechStatus()

  }
  changeOnSelectSousOrd(idOrd:any,idSO:any){
    var index=this.orders.findIndex((x:any)=> x.ord_id==idOrd)
    var indexSO=this.orders[index].sousOrders.findIndex((x:any)=>x.SousOrd_Id==idSO)
    this.orders[index].sousOrders[indexSO].prods.forEach((prod:any)=>{
      prod.status=this.orders[index].sousOrders[indexSO].SousOrd_status
    })
    this.refrechStatus();
  }

 

  refrechStatus(){   
      this.orders.forEach((ele:any) => {
      
        let numberOfSatatus=0
        ele.statusTable=[{status:'envoyée',info:[]},{status:'en livraison',info:[]},{status:'livrée',info:[]},{status:'payée',info:[]}]
        let test=200
        
 
        ele.sousOrders.forEach((y:any) => {
        
          if(y.prods.length<=1) test=y.prods.length
      else{for (let i = 0; i < y.prods.length-1; i++) {
        if(y.prods[i].status!=y.prods[i+1].status) test= -1;
      }}
          console.log("test1=",test,y.prods)
          let val2={SousOrd_status:''}
          switch (test) {
            case 1: val2.SousOrd_status=y.prods[0].status;
            if(y.SousOrd_status!=y.prods[0].status) this.CartService.updateSousOrdStatus(y.SousOrd_Id,val2).subscribe((res:any)=>{
              y.SousOrd_status=y.prods[0].status
            });break;
            case -1: val2.SousOrd_status='envoyée';
            if(y.SousOrd_status!='envoyée') this.CartService.updateSousOrdStatus(y.SousOrd_Id,val2).subscribe((res:any)=>{
              y.SousOrd_status='envoyée'
            });break;
            case 200: val2.SousOrd_status=y.prods[0].status;
             if(y.SousOrd_status!=y.prods[0].status) this.CartService.updateSousOrdStatus(y.SousOrd_Id,val2).subscribe((res:any)=>{
              y.SousOrd_status=y.prods[0].status
            });break;
            default:
              break;
          }
          switch (y.SousOrd_status) {
            case 'en livraison':ele.statusTable[1].info.push(0) ;break;
            case 'livrée':ele.statusTable[2].info.push(0) ;break;
            case 'payée':ele.statusTable[3].info.push(0) ;break;
            default:
              break;
          }
        }); 
        let test1=200,resultatTest1=''
        if(ele.prods.length<=1) test1=ele.prods.length
        else{for (let i = 0; i < ele.prods.length-1; i++) {
          if(ele.prods[i].status!=ele.prods[i+1].status) test1= -1;
        }}
        if((test1==200)||(test1==1)) resultatTest1=ele.prods[0].status;
        test=200;
      if(ele.sousOrders.length<=1) test=ele.sousOrders.length
      else {for (let i = 0; i < ele.sousOrders.length-1; i++) {
        if(ele.sousOrders[i].SousOrd_status!=ele.sousOrders[i+1].SousOrd_status) test= -1;
      }
      }
      console.log('test2=',test,ele.sousOrders)

      let val1={Ord_Status:''}
       switch (test) {
         case 1: if(ele.status!=ele.sousOrders[0].SousOrd_status){  
          
          if(resultatTest1==ele.sousOrders[0].SousOrd_status){val1.Ord_Status=ele.sousOrders[0].SousOrd_status;}
        else{val1.Ord_Status='envoyée';

        }
        this.CartService.updateOrderbyId(ele.ord_id,val1).subscribe((res:any)=>{
          ele.status=ele.sousOrders[0].SousOrd_status
          })
      };break;
         case -1: val1.Ord_Status='envoyée';
         if(ele.status!='envoyée') this.CartService.updateOrderbyId(ele.ord_id,val1).subscribe((res:any)=>{
           ele.status='envoyée'
         });break;
         case 200: ;
          if(ele.sousOrders[0].SousOrd_status!=ele.status) {
            if(resultatTest1==ele.sousOrders[0].SousOrd_status) {val1.Ord_Status=resultatTest1}
            else{val1.Ord_Status='envoyée'}
            this.CartService.updateOrderbyId(ele.ord_id,val1).subscribe((res:any)=>{
          ele.status=ele.sousOrders[0].SousOrd_status
         })};break;
         default:if(resultatTest1!=ele.status) {
          val1.Ord_Status=resultatTest1;
          
           this.CartService.updateOrderbyId(ele.ord_id,val1).subscribe((res:any)=>{
             ele.status=resultatTest1;
          });
         }break;
       }
       switch (ele.status) {
        case 'en livraison':ele.statusTable[1].info.push(0) ;break;
        case 'livrée':ele.statusTable[2].info.push(0) ;break;
        case 'payée':ele.statusTable[3].info.push(0) ;break;
        default:
          break;
      }
    numberOfSatatus=0;
      ele.statusTable.forEach((status:any)=>{
        if(status.info.includes(0)) numberOfSatatus++
      });
      switch (numberOfSatatus) {
        case 1: ele.statusTable.forEach((status:any)=>{
          if(status.info.includes(0)) {status.info=[];
          status.info.push(0);
          status.info.push(1);
        }
          else status.info=[1]; 
        });break
        case 2: ele.statusTable.forEach((status:any)=>{
          if(status.info.includes(0)) status.info=[0];
        });break;
      
        default:ele.statusTable[0].info=[0];
        ele.statusTable[1].info=[]
        ele.statusTable[2].info=[]
        ele.statusTable[3].info=[]
          break;
      }
console.log(ele.statusTable)
     
      });
    }





  getCart() {

    
    this.authService.loadUser();
    let userId = this.authService.authenticatedUser.U_Id;
 
    console.log(userId);
    
   
    this.CartService.getAllOrderFnx(userId).subscribe((data: any) => {
      console.log("data=",data);
      let i=0;
      
      data.forEach((x:any)=>{
        
        let cmd:any={
          ord_id:0,
          status:'',
          isOpen:false,
          isPayed:false,
          statusTable:[{status:'envoyée',info:[]},{status:'en livraison',info:[]},{status:'livrée',info:[]},{status:'payée',info:[]}],
          prods:[],
          sousOrders:[]
        }

       
      this.CartService.getProduct(x.Product).subscribe((prod:any)=>{
        this.CartService.getsousOrder(x.Order).subscribe((sousOrder:any)=>{
          this.CartService.getOrderbyId(x.Order).subscribe((ord:any)=>{
            sousOrder.forEach((element:any) => {
              element['prods']=[];
            });
            this.isPayed=false;
            if (x.OrdLign_Status=='payée'){
              this.isPayed=true;
            }
            prod[0]['isPayed']=this.isPayed
            prod[0]['Qte']=x.Ord_Qte
            prod[0]['LignId']=x.OrdLign_Id
            prod[0]['date']=x.Create_at
            prod[0]['status']=x.OrdLign_Status
            prod[0]['expected_delivery_date']='';
            

            let test=this.orders.findIndex((ele:any)=> ele.ord_id==x.Order)
            if(test==-1){
              this.isPayed=false;
              if (ord.Ord_Status=='payée'){
                this.isPayed=true;
              }
              cmd.ord_id=x.Order;
              cmd.sousOrders=[...sousOrder]
              
              cmd.sousOrders.forEach((ele:any) => {
                this.isPayed=false;
              if (ele.SousOrd_status=='payée'){
                this.isPayed=true;
              }
              ele['isPayed']=this.isPayed

     
              });
              
              cmd.status=ord.Ord_Status
              cmd.isPayed=this.isPayed
              if(!x.sousOrder){ cmd.prods.push(prod[0]);}
              else{
                
                let index=cmd.sousOrders.findIndex((ele:any)=> ele.SousOrd_Id==x.sousOrder);
                prod[0].expected_delivery_date=cmd.sousOrders[index].expected_delivery_date
                cmd.sousOrders[index].prods.push(prod[0]);
                
                
              }
              this.orders.push(cmd)
      
        
            }else{
              
              if(!x.sousOrder) {this.orders[test].prods.push(prod[0])}
              else{
                
                let index=this.orders[test].sousOrders.findIndex((ele:any)=> ele.SousOrd_Id==x.sousOrder);
                prod[0].expected_delivery_date=this.orders[test].sousOrders[index].expected_delivery_date
                this.orders[test].sousOrders[index].prods.push(prod[0]);
              }
             
              
            }

            
             i++
            if(i==data.length) {this.refrechStatus()
            console.log('1',this.orders)}
           
          })
    
     
      
     
         

          
        })
        
      }) 
      
      
    })
    
  })}


  


 




}

