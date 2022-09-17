import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params ,ActivatedRoute} from '@angular/router';
import { CategoryScale } from 'chart.js';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';



@Component({
  selector: 'app-add-productcarac',
  templateUrl: './add-productcarac.component.html',
  styleUrls: ['./add-productcarac.component.css']
})
export class AddProductcaracComponent implements OnInit {
 
  constructor(
    private service: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,

  ) {}
  submitted:boolean=false;
  ID:any;
  addP: FormGroup | any;
 caraclist:any=[];
 detaillist:any=[];
 CategList:any=[];
 categbox: box[] = [];
 category:number[]=[];
 product:any=[];
 P_categ:any=[];
 P_carac:any=0;

 P_caracdetail:string='';
 hide:boolean=false;
 P_newcarac:string='';

  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/auth/login']);
    }
    
    this.refreshList();

    this.addP = this.fb.group({
      newcarac: ['', [Validators.required, Validators.maxLength(50)]],
      categ: ['', [Validators.required, Validators.maxLength(50)]],
      carac: ['', [Validators.required, Validators.maxLength(50)]],
      caracdetail: ['', [Validators.required, Validators.maxLength(50)]],

     
    });
   
    
  }
  open()
  { 
    this.hide=!this.hide;
    //console.log(this.hide);
  }
  option(){
     
      this.service.getdetailByCarac(this.P_carac).subscribe((data:any)=>{
       this.detaillist=data;
       console.log(data);
      })
     
  }
  optioncateg(){
     
    this.service.getdetailByCarac(this.P_carac).subscribe((data:any)=>{
     this.detaillist=data;
     console.log(data);
    })
   
}
  get f() {
    return this.addP.controls;
  }
  Add_Productcarac(id:any){
    console.log(id);
    console.log(this.P_caracdetail);
    var val={
      Prod_Id:id,
      Carec_Id:this.P_caracdetail
    }
    this.service.addcaracproduct(val).subscribe((res:any) => {
      alert(res.toString());
    
      console.log(res);
      
      this.refreshList();})
  }
  onchange(id:any){

    this.category.push(id);

  }
 Add_Carac(){
  var val={
    Carecteristique:this.P_newcarac,
    category:this.category
  }
  console.log(val)
  this.service.addCarac(val).subscribe((res:any)=>{
    alert(res.toString());

  })
 
 
 }
  
  refreshList()
  {  
     this.service.getCategList().subscribe((data) => {
    this.CategList = data;
    for(let l of this.CategList)
    {
      this.categbox.push({id:l.Categ_Id,name:l.Categ_Name,isselected:false})
    }
   
  });

    
    this.route.params.forEach((params: Params) => {
   if (params['id'] !== undefined) {
     let id = +params['id'];
    this.service.getProductById(id).subscribe((data:any)=>{
      this.product=data;
      console.log(this.product);
      this.service.getcaracByCateg(this.product[0].category).subscribe((data:any) => {
        this.caraclist = data;
        console.log(data);
      });
    })
   }

    
    
  
});

}
}
class box{
  id:number=0;
  name:string='';
  isselected:boolean=false;
}