import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-productdetails',
  templateUrl: './add-productdetails.component.html',
  styleUrls: ['./add-productdetails.component.css'],
})
export class AddProductdetailsComponent implements OnInit {
 
  cover!: File;
  heroForm: any;
  addP: FormGroup | any;
  submitted = false;
  constructor(
    private service: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute

  ) {}
  PhotoFileName!: string;
  PhotoFilePath!: string;
 

  P_color: string = '';
  
  P_image: string = '';
 
  ngOnInit(): void {
    if(!this.authService.isAdmin()){
      this.router.navigate(['/auth/login']);
    }
    this.refreshList();
    this.addP = this.fb.group({
      coleur: ['', [Validators.required, Validators.maxLength(100)]],
      
      image: ['', [Validators.required, Validators.maxLength(100)]],
      
    });
  }
  refreshList() {
   
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
  Add_ProductImg() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
      
    var val = {
      product:id,
      color:this.P_color,
      url: this.PhotoFileName.substring(0, this.PhotoFileName.length ),
    };
    console.log(val);
    var img = {
      product: 2,
      url: this.PhotoFileName,
    };

    this.service.addProductImg(val).subscribe((res) => {
      alert(res.toString());
      console.log('add');
      this.refreshList();
      this.router.navigateByUrl('/product/all/-1');
      
    });
  }});
  }

  onSubmit() {
    this.submitted = true;
    console.log('abc');
    this.Add_ProductImg();  
    // stop here if form is invalid
    if (this.addP.invalid) {
      return;
    }
    
    //this.Add_ProductImg();  
    
                 
  }
    
  }
 
