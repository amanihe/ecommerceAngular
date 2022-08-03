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
  filterCondition:any=''
  statusToFind:any=''
  notFound:boolean=false
  isAdmin: boolean=false;
  DateFormeIsOpen:boolean=false
  fnxOrClient:any=''
  ordersNum:any=-1;
  newSousOrdData:any=''
  ngOnInit(): void {
  if (this.orders.length==0) this.getCart();
   
  
  }
  open(id:any) {
    
    let index=this.orders.findIndex((x:any)=> x.ord_id==id);
    this.orders[index].isOpen=!this.orders[index].isOpen
  
  }
  filter(){
  switch (this.filterCondition) {
    case 'date':
      this.orders.sort((a:any,b:any)=> new Date(a.date).getTime() - new Date(b.date).getTime())
      break;
    case 'order' :this.orders.sort((a:any,b:any)=> a.ord_id - b.ord_id);break;
    default:
      break;
  }
    
    this.ngOnInit() 
  }
 
  
  search(){
   
    if(this.searchedId)  {
      
      this.orders=this.orders.filter((e:any)=> e.ord_id==Number(this.searchedId) )
      if (this.orders.length==0) this.notFound=true
      else this.notFound=false
      }
    else {this.notFound=false
      this.orders=[]};
    this.ngOnInit()
  }

  fnxOrClientSearch(){
    if(this.fnxOrClient!='')  {

      this.orders=this.orders.filter((e:any)=> e.orderType==this.fnxOrClient )
      if (this.orders.length==0) this.notFound=true
      else this.notFound=false
      }
    else this.orders=[];
    this.ngOnInit()
   
  }
  getNewSousOrdDate(){
    this.DateFormeIsOpen=!this.DateFormeIsOpen
  }

  addNewSousOrd(ord_id:any){
    let index=this.orders.findIndex((e:any)=> e.ord_id==ord_id);
    var val2={
      Ord_Id:ord_id,
      expected_delivery_date:this.newSousOrdData,
      SousOrd_status:'envoyée',
      real_delivery_date:null
    }
   if(this.orders[index].sousOrders.findIndex((sousOrd:any)=> sousOrd.expected_delivery_date==this.newSousOrdData)==-1){
    this.CartService.creatsousOrder(val2).subscribe((res:any)=>{
     
      res['isDeliverd']=false;
      res['isPayed']=false;

      res['prods']=[];
    
      this.orders[index].sousOrders.push(res)
      console.log(this.orders)
    })
    this.DateFormeIsOpen=false}
  }

//gere changement des dates dans les prod 
  verifierSousOrders(ord_id:any,OrdLign_Id:any,sousOrd_id:any){
    let index=this.orders.findIndex((e:any)=> e.ord_id==ord_id);
    //cas des prods sans date estime
    if(sousOrd_id==-1){
      let indexInProds=this.orders[index].prods.findIndex((e:any)=> e.LignId==OrdLign_Id)
      let indexSousOrd=this.orders[index].sousOrders.findIndex((e:any)=> {var date1=new Date(e.expected_delivery_date),date2=new Date(this.orders[index].prods[indexInProds].expected_delivery_date)
        return date1.getTime()==date2.getTime()})
      if(indexSousOrd!=-1){
        this.orders[index].sousOrders[indexSousOrd].prods.push(this.orders[index].prods[indexInProds])
        this.orders[index].prods.splice(indexInProds,1);
      }
      else{
        var val2={
          Ord_Id:ord_id,
          expected_delivery_date:this.orders[index].prods[indexInProds].expected_delivery_date,
          SousOrd_status:'envoyée',
          real_delivery_date:null
        }
     
        this.CartService.creatsousOrder(val2).subscribe((res:any)=>{
         
          res['isDeliverd']=false;
          res['isPayed']=false;
    
          res['prods']=[];
          res.prods.push(this.orders[index].prods[indexInProds])
          this.orders[index].prods.splice(indexInProds,1);
        
          this.orders[index].sousOrders.push(res)
        })}
      }
      //cas de changement du date l'un des produits d'un sousOrder
      else{
        let indexSousOrd=this.orders[index].sousOrders.findIndex((e:any)=> e.SousOrd_Id==sousOrd_id)
        let indexInProds=this.orders[index].sousOrders[indexSousOrd].prods.findIndex((e:any)=> e.LignId==OrdLign_Id)
        let testToFind=false
        console.log(this.orders[index].sousOrders[indexSousOrd].prods)
        this.orders[index].sousOrders.forEach((sousOrd:any)=>{
          if(sousOrd.expected_delivery_date==this.orders[index].sousOrders[indexSousOrd].prods[indexInProds].expected_delivery_date){
            sousOrd.prods.push(this.orders[index].sousOrders[indexSousOrd].prods[indexInProds])
            this.orders[index].sousOrders[indexSousOrd].prods.splice(indexInProds,1);
            testToFind=true
          }
        })
        if(!testToFind){
          var val2={
            Ord_Id:ord_id,
            expected_delivery_date:this.orders[index].sousOrders[indexSousOrd].prods[indexInProds].expected_delivery_date,
            SousOrd_status:'envoyée',
            real_delivery_date:null
          }
       
          this.CartService.creatsousOrder(val2).subscribe((res:any)=>{
           
            res['isDeliverd']=false;
            res['isPayed']=false;
      
            res['prods']=[];
            res.prods.push(this.orders[index].sousOrders[indexSousOrd].prods[indexInProds])
            this.orders[index].sousOrders[indexSousOrd].prods.splice(indexInProds,1);
          
            this.orders[index].sousOrders.push(res)
          })
        }
      }
    
  }







  valide(){
  this.orders.forEach((ord:any)=>{
    ord.prods.forEach((prod:any)=>{
      

           // qte update
        if((prod.status=='payée')&&(prod.isPayed==false)){
                if(ord.orderType=='admin') {
            var val_qte={
            Prod_Quantity:prod.Qte,
          }

          this.CartService.editProductQte(prod.Prod_Id,val_qte).subscribe((res:any)=>{})}
          else if((ord.orderType=='customer')){
                if(prod.Prod_Quantity>=prod.Qte){
                  val_qte={
                    Prod_Quantity:-prod.Qte,
                  }
        
                  this.CartService.editProductQte(prod.Prod_Id,val_qte).subscribe((res:any)=>{}) 
                }
                else{
                  prod.status='envoyée';
                  alert("stock insuffisant!!")
                }
          }
        }
        var updatedOrdLigne={
          OrdLign_Id: prod.LignId,
          Order:ord.ord_id,
          Product: prod.Prod_Id,
          Ord_Qte: prod.Qte,
          Supplier:prod.Supplier,
          OrdLign_Status:prod.status,
          sousOrder:null
        }
        this.CartService.updateOrderLigne(updatedOrdLigne).subscribe((res2:any)=>{})
      
    })

    ord.sousOrders.forEach((sousOrd:any)=>{
      if(sousOrd.prods.length==0){
        this.CartService.delete_sousOrd(sousOrd.SousOrd_Id).subscribe((res:any)=>{})
      }else{

     
        let RealDateDelivery=sousOrd.prods[0].real_delivery_date
        let testDate=true
      sousOrd.prods.forEach((prod:any)=>{  
      
      //qte update
      if((prod.status=='payée')&&(prod.isPayed==false)){
          if(ord.orderType=='admin') {
      var val_qte={
      Prod_Quantity:prod.Qte,
    }

    this.CartService.editProductQte(prod.Prod_Id,val_qte).subscribe((res:any)=>{})}
    else if((ord.orderType=='customer')){
          if(prod.Prod_Quantity>=prod.Qte){
            val_qte={
              Prod_Quantity:-prod.Qte,
            }
  
            this.CartService.editProductQte(prod.Prod_Id,val_qte).subscribe((res:any)=>{}) 
          }
          else{
            prod.status='envoyée';
            alert("stock insuffisant!!")
          }
    }
  }


        var date1=new Date(RealDateDelivery)
        var date2=new Date(prod.real_delivery_date)
        if(date1.getTime()!=date2.getTime()) testDate=false    
        var updatedOrdLigne={
        OrdLign_Id: prod.LignId,
        Order:ord.ord_id,
        Product: prod.Prod_Id,
        Ord_Qte: prod.Qte,
        Supplier:prod.Supplier,
        OrdLign_Status:prod.status,
        real_delivery_date:prod.real_delivery_date,
        sousOrder:sousOrd.SousOrd_Id
      }
      this.CartService.updateOrderLigne(updatedOrdLigne).subscribe((res:any)=>{})})
        var resultRealDate=null
        if(testDate) resultRealDate=RealDateDelivery
         var updatedSousOrd={
          SousOrd_Id:sousOrd.SousOrd_Id,
          Ord_Id:ord.ord_id,
          SousOrd_status:sousOrd.status,
          expected_delivery_date:sousOrd.expected_delivery_date,
          real_delivery_date:resultRealDate
        } 
        this.CartService.update_sousOrder(sousOrd.SousOrd_Id,updatedSousOrd).subscribe((res:any)=>{})
      }
    })

  })

this.getCart()

  }

  drop(event: CdkDragDrop<any>,id:any) {
    var previousContainerId=event.previousContainer.id;
    var containerId=event.container.id;
    var previousContainerSplited=previousContainerId.split(",") 
    var containerSplited=containerId.split(",")
    var index=this.orders.findIndex((x:any)=> x.ord_id==id);
    let numberOfSatatus=0
    this.orders[index].statusTable.forEach((status:any)=>{
      if(status.info.includes(0)) numberOfSatatus++
     })
//condition pour avoir des transaction uniquement dans le meme ordre et meme fonctionalite
 if((previousContainerSplited[1]==containerSplited[1])&&(previousContainerSplited[0].length==containerSplited[0].length)&&(numberOfSatatus<=1)){   
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
    }}


//configuration des status drag and drop lors du changement si il ya une seule etat d'order

if(numberOfSatatus==1) {this.orders[index].statusTable.forEach((status:any)=>{
   if(status.info.includes(0)) {
    this.orders[index].status=status.status;
    this.changeOnSelectOrd(this.orders[index].ord_id)
 
 }})

};

//gere les changement des produit

this.orders[index].prods.forEach((pord:any)=>{
    pord.expected_delivery_date=null
  })
this.orders[index].sousOrders.forEach((sousOrd:any)=>{
    sousOrd.prods.forEach((pord:any)=>{
      pord.expected_delivery_date=sousOrd.expected_delivery_date
    })
  })





   
  }

   
 




  changeOnSelectOrd(id:any){
    //changer etat du order et prods sans sousOrd et sousOrs et ses prods
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
    //changer etat sousOrs et ses prods
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
        //tester les etat des prod des sousOrd
          if(y.prods.length<=1) test=y.prods.length
      else{for (let i = 0; i < y.prods.length-1; i++) {
        if(y.prods[i].status!=y.prods[i+1].status) test= -1;
      }}
          switch (test) {
            case 1: if(y.SousOrd_status!=y.prods[0].status) y.SousOrd_status=y.prods[0].status;break;
            case -1: if(y.SousOrd_status!='envoyée') y.SousOrd_status='envoyée';break;
            case 200:y.SousOrd_status=y.prods[0].status;break;
            default:
              break;
          }
          //configurer le drag and drop(collection des donnee/le 0 est consider comme trouve)
          switch (y.SousOrd_status) {
            case 'en livraison':ele.statusTable[1].info.push(0) ;break;
            case 'livrée':ele.statusTable[2].info.push(0) ;break;
            case 'payée':ele.statusTable[3].info.push(0) ;break;
            default:
              break;
          }
        });
        // tester les etat des prod sans sousOrd 
        let test1=200,resultatTest1=''
        if(ele.prods.length<=1) test1=ele.prods.length
        else{for (let i = 0; i < ele.prods.length-1; i++) {
          if(ele.prods[i].status!=ele.prods[i+1].status) test1= -1;
        }}
        if((test1==200)||(test1==1)) resultatTest1=ele.prods[0].status;
        //tester les etats des sousOrds
        test=200;
      if(ele.sousOrders.length<=1) test=ele.sousOrders.length
      else {for (let i = 0; i < ele.sousOrders.length-1; i++) {
        if(ele.sousOrders[i].SousOrd_status!=ele.sousOrders[i+1].SousOrd_status) test= -1;
      }
      }
      
       switch (test) {
         case 1: if(ele.status!=ele.sousOrders[0].SousOrd_status){  
          
          if((resultatTest1==ele.sousOrders[0].SousOrd_status)||(test1==0)){ele.status=ele.sousOrders[0].SousOrd_status;}
        else{ele.status='envoyée';}
      };break;
         case -1: ele.status='envoyée';break;
         case 200: ;
          if(ele.sousOrders[0].SousOrd_status!=ele.status) {
            if((resultatTest1==ele.sousOrders[0].SousOrd_status)||(test1==0)) {ele.status=ele.sousOrders[0].SousOrd_status}
            else{ele.status='envoyée'}};break;
         default:if(resultatTest1!=ele.status) {
         if(test1==-1) ele.status='envoyée' 
          else ele.status=resultatTest1; }break;
       }
       //configurer le drag and drop(collection des donnee)
       switch (ele.status) {
        case 'en livraison':ele.statusTable[1].info.push(0) ;break;
        case 'livrée':ele.statusTable[2].info.push(0) ;break;
        case 'payée':ele.statusTable[3].info.push(0) ;break;
        default:
          break;
      }
      //configuration final du drag and drop 
    numberOfSatatus=0;
      ele.statusTable.forEach((status:any)=>{
        if(status.info.includes(0)) numberOfSatatus++
      });
      switch (numberOfSatatus) {
        case 1: ele.statusTable.forEach((status:any)=>{
          if(status.info.includes(0)) {status.info=[];
          status.info.push(0);
        }
          else status.info=[]; 
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
     
      });
    }


    dataOrganization(data:any[]){
      let i=0
      data.forEach((x:any)=>{
        
      let cmd:any={
        ord_id:0,
        status:'',
        date:'',
        orderType:'',
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
          prod[0]['expected_delivery_date']=null;
          prod[0]['real_delivery_date']=null;
          prod[0]['Supplier']=x.Supplier
          

          let test=this.orders.findIndex((ele:any)=> ele.ord_id==x.Order)
          //ajoutation d'un nouveau order
          if(test==-1){
            this.isPayed=false;
            if (ord.Ord_Status=='payée'){
              this.isPayed=true;
            }
            cmd.ord_id=x.Order;
            sousOrder.forEach((sousOrd:any)=>{
            //pour l'ajout de la date reel du delivration
              var isDeliverd=false
              if(sousOrd.SousOrd_status=='livrée'){
                isDeliverd=true
              }
              sousOrd['isDeliverd']=isDeliverd
              cmd.sousOrders.push(sousOrd)
            })
            cmd.date=ord.Ord_Date
            cmd.orderType=ord.Ord_Type
            cmd.sousOrders.forEach((ele:any) => {
              this.isPayed=false;
            if (ele.SousOrd_status=='payée'){
              this.isPayed=true;
            }
            ele['isPayed']=this.isPayed

   
            });
            
            cmd.status=ord.Ord_Status
            cmd.isPayed=this.isPayed
            //le prod n'appartient a aucun sousOrder
            if(!x.sousOrder){ cmd.prods.push(prod[0]);}
            else{
              //le prod appartient a un sousOrd
              let index=cmd.sousOrders.findIndex((ele:any)=> ele.SousOrd_Id==x.sousOrder);
              prod[0].expected_delivery_date=cmd.sousOrders[index].expected_delivery_date
              cmd.sousOrders[index].prods.push(prod[0]);
              
              
            }
            this.orders.push(cmd)
    
      
          }else{
            //edit un order deja cree
            if(!x.sousOrder) {this.orders[test].prods.push(prod[0])}
            else{
              
              let index=this.orders[test].sousOrders.findIndex((ele:any)=> ele.SousOrd_Id==x.sousOrder);
              prod[0].expected_delivery_date=this.orders[test].sousOrders[index].expected_delivery_date
              this.orders[test].sousOrders[index].prods.push(prod[0]);
            }
           
            
          }

          //probleme au subscribe et on veut que la fonction ne soit appeller qu'a la fin
           i++
          if(i==data.length) {this.refrechStatus()
          this.orders.forEach((ord:any)=>{
            ord.sousOrders.forEach((sousOrd:any)=>{
              if(sousOrd.prods.length==0){
                  this.CartService.delete_sousOrd(sousOrd.SousOrd_Id).subscribe((res:any)=>{})}
              
            })
          })
        this.ordersNum=this.orders.length
        if(this.statusToFind!=''){
          this.orders=this.orders.filter((e:any)=> e.status==this.statusToFind )
          if(this.orders.length==0) this.notFound=true}}
         
        })
  
   
    
   
       

        
      })
      
    }) 
    
    
  })
  }





  getCart() {

    
    this.authService.loadUser();
    let userId = this.authService.authenticatedUser.U_Id;
 
    console.log('user=',this.authService.isAdmin());
    this.orders=[]
    if(this.authService.isFnx()){ this.CartService.getAllOrderFnx(userId).subscribe((data: any) => {
      console.log("data=",data);
      this.dataOrganization(data);
      })
    this.isAdmin=false}

    if(this.authService.isAdmin()){
      this.CartService.getAllOrder().subscribe((data:any)=>{
        console.log("data=",data);
        this.dataOrganization(data);
      })
      this.isAdmin=true
    }
    
    
    
    
    
    }


  


 




}

