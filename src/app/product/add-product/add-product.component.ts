import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryScale } from 'chart.js';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  cover!: File;
  heroForm: any;
  addP: FormGroup | any;
  submitted = false;
  constructor(
    private service: SharedService,
    private fb: FormBuilder,
 
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute

  ) {}
  categtest=false;
  PhotoFileName!: string;
  PhotoFilePath!: string;
  CategList: any = [];
  hide=false;
  P_name: string = '';
  P_categ: any;
  P_categ2: string = '';
  P_desc: string = '';
  P_marque: string = '';
  P_price: any = 0;
  P_image: string = '';
  P_quantity: any = 0;
  P_fnx: string = '';
  categid:any;
  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/auth/login']);
    }
    this.route.params.forEach((params: Params) => {
      if (params['id'] == -1) {
      this.categtest=true;}
      else{  if (params['id'] !== undefined) {
        let id = +params['id'];
         this.categid=id
        this.categtest=false;}
      }})
      console.log(this.categid)
    this.refreshList();
    this.addP = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      marque: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      category2: ['', [ Validators.maxLength(50)]],
    });
  }
  refreshList() {
    this.service.getCategList().subscribe((data) => {
      this.CategList = data;})
    
  }
  add_Category()
  { var val={
    Categ_Name:this.P_categ2,
    Categ_Parent:this.P_categ,

  }
  this.service.addCateg(val).subscribe((res:any)=>{
   
    var val = {
      category: res.Categ_Id,
      Prod_Name: this.P_name,
      Prod_Description: this.P_desc,
      Prod_Marque: this.P_marque,
      Prod_Price: this.P_price,
      Prod_Quantity: 0,
      Prod_Img: this.PhotoFileName.substring(0, this.PhotoFileName.length ),
    };
  
    this.service.addProduct(val).subscribe((res:any) => {
      alert(res.toString());
    
      console.log(res);
      
      this.refreshList();
      //this.router.navigateByUrl('/product/all/-1');
      this.router.navigate(['/product/addProductdetails/',res.Prod_Id]);
    });
  });


  }

  Submit_Product_Order() {
    
    var val = {
      Clt_Id: 1,
      Ord_Status: 'to order',
      Ord_Type: 'admin',
    };
    this.service.addOrder(val).subscribe((res) => {
      alert(res.toString());
      this.refreshList();
    });
  }
  open()
  { 
    this.hide=!this.hide;
    //console.log(this.hide);
  }
  get f() {
    return this.addP.controls;
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
  Add_Product() {
    console.log(this.categtest)
   if (!this.categtest){
   
        var val = {
          category: this.categid,
          Prod_Name: this.P_name,
          Prod_Description: this.P_desc,
          Prod_Marque: this.P_marque,
          Prod_Price: this.P_price,
          Prod_Quantity: 0,
          Prod_Img: this.PhotoFileName.substring(0, this.PhotoFileName.length ),
        };
        console.log(val)
        this.service.addProduct(val).subscribe((res:any) => {
          alert(res.toString());
        
          console.log(res);
          
          this.refreshList();
          //this.router.navigateByUrl('/product/all/-1');
          this.router.navigate(['/product/addProductdetails/',res.Prod_Id]);
        });
        
       
   }
  
   
  
  else{
    var val = {
      category: this.P_categ,
      Prod_Name: this.P_name,
      Prod_Description: this.P_desc,
      Prod_Marque: this.P_marque,
      Prod_Price: this.P_price,
      Prod_Quantity: 0,
      Prod_Img: this.PhotoFileName.substring(0, this.PhotoFileName.length ),
    };
    console.log(val)
    this.service.addProduct(val).subscribe((res:any) => {
      alert(res.toString());
    
      console.log(res);
      
      this.refreshList();
      //this.router.navigateByUrl('/product/all/-1');
      this.router.navigate(['/product/addProductdetails/',res.Prod_Id]);
    });
  }
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addP.invalid) {
      return;
    }
    if(this.categtest){
    if(this.hide==true)
    {this.add_Category();
    }
    else{
      this.Add_Product();
    }}
    else{
      this.Add_Product();
    }
                    
  }
}
