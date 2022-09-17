import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  addP: FormGroup | any;
  product: any=[];
  ID:any;
  len:any=[];
  listimgcolor:any=[];
  listcaracD:any=[];
  listcarac:any=[];
  listcaracP:any=[];
  color:any;
  PhotoFileName!: string;
  PhotoFilePath!: string;
  P_image :string='';
 hide1=false;
 hide2=false;
 hide3=false;
 hide=false;
 hide4=false;
  constructor(private authService: AuthService,private router: Router,
    private service: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,) { }
    liste: any = [];
    listImg: any = [];
    orders:any=[];
    userId:any=0
    isAdmin:any=false;
    pic:any;
    Id:any;
    couleur:any;
    P_Price:any=0;
    P_Quantity:any=0;
    P_Description:string='';
    P_Name:string='';
    detaillist:any=[];
    P_caracdetail:any=0;
  ngOnInit(): void {
this.isAdmin=this.authService.isAdmin();
    this.refresh();
    this.userId = this.authService.authenticatedUser.U_Id;
    
    this.addP = this.fb.group({
      name: ['', [ Validators.maxLength(100)]],
      quantite: ['', [ Validators.maxLength(50)]],
      price: ['', [ Validators.maxLength(100)]],
      description: ['', [ Validators.maxLength(100)]],
      caracdetail:['', [ Validators.maxLength(100)]],
      
    });
   }
   on()
   {
     this.hide=!this.hide;
   }
  on1()
  {
    this.hide1=!this.hide1;
  }
  on2()
  {
    this.hide2=!this.hide2;
  }
  on3()
  {
    this.hide3=!this.hide3;
  }
  caracoption(id:any){
    this.hide4=!this.hide4;
    this.service.getdetailByCarac(id).subscribe((data:any)=>{
     this.detaillist=data;
     console.log(data);
    })
   
}
  modifier()
  { if(this.P_Name=='')
  {
    this.P_Name=this.product[0].Prod_Name;
  }
  if(this.P_Description=='')
  {
    this.P_Description=this.product[0].Prod_Description;
  }
  if(this.P_Quantity==0)
  {
    this.P_Quantity=this.product[0].Prod_Quantity;
  }
  if(this.P_Price=='')
  {
    this.P_Price=this.product[0].Prod_Price;
  }
    var val={
      category: this.product[0].category,
      Prod_Name: this.P_Name,
      Prod_Description: this.P_Description,
      Prod_Marque: this.product[0].Prod_Marque,
      Prod_Price: this.P_Price,
      Prod_Quantity: this.P_Quantity,
      Prod_Url:this.product[0].Prod_Url
    }
    this.service.updateProduct2(this.product[0].Prod_Id,val).subscribe((result:any) => {
      console.log(result);
      //this.router.navigateByUrl('/product/details/'+this.product[0].Prod_Id);
    });
      
     
  }

  Add_Order(l:any) {
    this.authService.loadUser()
    var userId = this.authService.authenticatedUser.U_Id;
    this.service.getOrder(userId).subscribe((data: any) => {
      this.orders = data;

    if ( this.orders.length==0 ){
      console.log(this.orders.length)
      var val1 = {
        User: userId,
        Ord_Type: "customer",
        Ord_Status: "créée",

      };
      this.service.addOrder(val1).subscribe((res:any) => {
        console.log(res.Ord_Id);

        var val2 = {
          Order: res.Ord_Id,
          Product: l,
          Ord_Qte: 16,
          Supplier:null,
          OrdLign_Status:"créée"
        };
        this.service.addOrderLign(val2).subscribe((result:any) => {
          console.log(result);
          this.router.navigateByUrl('/cart');
        });


      });
    }
else{
    this.orders.forEach((o:any)=>{

      if(o.Ord_Status==="créée" ){


          var val = {
            Order: o.Ord_Id,
            Product: l,
            Ord_Qte: 1,
            Supplier:null,
            OrdLign_Status:"créée"
          };
          this.service.addOrderLign(val).subscribe((result:any) => {
            alert(result.toString());
            this.router.navigateByUrl('/cart');
          });

      }
      else{
        var val1 = {
          User: userId,
          Ord_Type: "customer",
          Ord_Status: "créée",

        };
        this.service.addOrder(val1).subscribe((res:any) => {
          console.log(res.Ord_Id);

          var val2 = {
            Order: res.Ord_Id,
            Product: l,
            Ord_Qte: 16,
            Supplier:null,
            OrdLign_Status:"créée"
          };
          this.service.addOrderLign(val2).subscribe((result:any) => {
            console.log(result);
            this.router.navigateByUrl('/cart');
          });


        });
      }


});
}
});
  }

  image(ch:any)
  {
    this.pic=ch;
    console.log(this.pic);
  }

  imagecolor(c:any,id:any)
  {  this.Id=id;
    this.couleur=c;
    console.log(this.couleur);
      console.log(id);
    this.service.getProductImgColor(id).subscribe((data:any) => { this.listImg=data;
      console.log(this.listImg);
      this.pic=this.listImg[0].Pic_Url;
     
      
      
      
    });
  }
  
  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {

      this.PhotoFileName = data.toString();
      
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
   
  }
  
  
 
  Add_Photo(c:any,id:any) {
    var val = {
      Pic_Id:id,
      Pic_Color:c,
      Pic_Url: this.PhotoFileName.substring(0, this.PhotoFileName.length ),
    };
    
    this.service.addProductImgColor(val).subscribe((res:any) => {
      alert(res.toString());
    console.log('bcd');    
      console.log(res);
      console.log('abc');
      
    });
  }
  Add_color(id :any) {
   
        this.router.navigate(['/product/addProductdetails/',id]);
    
   
      
      
    
  }
 Add_carac(id:any){
  this.router.navigate(['/product/addProductcarac/',id]);
 }
 modifiercarac(p:any){
  this.route.params.forEach((params: Params) => {
    if (params['id'] !== undefined) {
      let id = +params['id'];
  var val={
    Carec_Prod_Id:p,
    Prod_Id:id,
    Carec_Id:this.P_caracdetail,
    
   
  }
  
  console.log(val)
this.service.updateCarac(val).subscribe((result:any) => {
  console.log(result);

  
  

})
}})
 }

  refresh(){
   
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
       
        this.service.getcaracProduct(id).subscribe((data:any)=>{
          this.listcaracP=data;
          var i=0;
          
          this.listcaracD=[];
          this.listcarac=[]
          for(let l of this.listcaracP)
          {
            this.service.getcaracDetail(l.Carec_Id).subscribe((data:any)=>{
              this.listcaracD.push(data);
             
            
             this.service.getcarac(this.listcaracD[i][0].Carac_Id).subscribe((data:any)=>{
              this.listcarac.push(data);
              console.log(data);
            })
              
              i=i+1;
               this.len.push(i);
               
            })
           
          }
          
        })
       





        this.service.getProductById(id)
        .subscribe((data: any) => {
          this.product = data;
          console.log(this.product)
          this.service.getProductImgById(id)
          .subscribe((data: any) => {
            this.listimgcolor = data;
            console.log(this.listimgcolor)
            this.couleur=this.listimgcolor[0].color;
            this.Id=this.listimgcolor[0].id;
            this.ID=this.listimgcolor[0].id;
            this.pic=this.listimgcolor[0].url;
            this.service.getProductImgColor(this.ID)
          .subscribe((data: any) => {
            this.listImg = data;

            console.log(this.listImg)})
  
      })

    })}
    });
  }
}
