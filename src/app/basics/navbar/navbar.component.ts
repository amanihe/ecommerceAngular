import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/authservice';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private service: SharedService,
    private router: Router,
    private authService: AuthService
  ) {}
  isAdmin!: boolean;
  isAuthentificated!: boolean;
  CategList: any = [];
  Categ: any;
  Categ_Id: any = 0;
  V_Category_Name: string = '';
  V_Category_Namea: string = '';
  Categ_Namee: string = '';
  Categ_Parent: any = 1;
  ModalTitle: string = '';
  ActivateAddEditComp: boolean = false;
  ngOnInit(): void {
    this.refreshCategList();


  }
  refreshCategList() {
    this.service.getCategList().subscribe((data) => {
      this.CategList = data;
      this.authService.loadUser();
      this.isAdmin=this.authService.isAdmin()
      this.isAuthentificated=this.authService.isAuthenticated();
      console.log( this.isAdmin)
    });
  }
  openProduct(id: any) {
    console.log(id)
    this.router.navigate(['/product/all/', id]);
  }
  Add_Category() {
    var val = {
      Categ_Name: this.V_Category_Namea,
      Categ_Parent: null,
    };
    this.service.addCateg(val).subscribe((res) => {
      alert(res.toString());
      this.refreshCategList();
    });
  }
  Add_Sous_Category(id: any) {
    var val = {
      Categ_Name: this.V_Category_Name,
      Categ_Parent: id,
    };
    this.service.addCateg(val).subscribe((res) => {
      alert(res.toString());
      this.refreshCategList();
    });
  }
  updateCateg(v: any) {
    var val = {
      Categ_Id: v.Categ_Id,
      Categ_Name: this.Categ_Namee,
    };
    this.service.updateCateg(val).subscribe((res) => {
      alert(res.toString());
    });
    this.refreshCategList();
  }
  deleteClick(Categ_id: any) {
    if (confirm('Are you sure to delete ??' + Categ_id)) {
      this.service.deleteCateg(Categ_id).subscribe((data) => {
        alert(data.toString());
        this.refreshCategList();
      });
    }
  }
  editClick(item1: any, item2: any) {
    this.Categ = {
      Categ_Id: item1,
      Categ_Name: item2,
    };
    this.ModalTitle = 'Edit Categ';
    this.ActivateAddEditComp = true;
  }
}
