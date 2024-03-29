import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { DatePipe } from '@angular/common'
//import * as pdfMake from 'pdfmake/build/pdfmake';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AuthService } from 'src/app/services/auth/authservice';
pdfMake.vfs = pdfFonts.pdfMake.vfs;






@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers :[DatePipe]
})
export class DetailsComponent implements OnInit {
  order:any=[];
  var:any;
  date:any;
  id : any ;
  total=0;
  orders: any=[];
  user: any;
  discount =0;
  TotalFinal=0;
  facture: any=[];
  OrdId:any;
  SupplierId:any;
  supplier:any;
  supplierName:any;
  supplierEmail:any;
  supplierTel:any;
  isAuthentificated!: boolean;
  isAdmin!: boolean;
  isClient! : boolean;
  constructor(
    private router: Router,
    private CartService: CartService,
    private auth: AuthService,
    private pdfservice: SharedService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.id=id;
        this.pdfservice.getFactureById(id).subscribe((data: any) => {
          this.facture = data;
          this.OrdId = data.order;
          this.pdfservice.getHistory(data.order).subscribe((res:any)=>{
            res[1].forEach((i: any) => {
              this.total += parseInt(i.Prod_Price) * i.Ord_Qte;
              this.discount=this.total*0.1 ;
              this.TotalFinal=this.total-this.discount ;
            })
            res['total'] = this.total;
            this.orders.push(res);
            this.var=this.orders[0][1];
            this.auth.getUserById(this.orders[0][0].User).subscribe((resultat: any)=>{
              this.user=resultat[0];
             //user status
              this.isClient=this.user.U_Client;
              this.isAuthentificated = this.auth.isAuthenticated();
              this.isAdmin = this.auth.isAdmin();
              if((this.isAdmin==false)||(this.isAdmin==true&&this.isClient==true)){
                  this.supplierName='Entreprise : TECH+';
                  this.supplierEmail='contact@ic-canada.com';
                  this.supplierTel='438-992-5560'
                }
              else{
                  this.pdfservice.getOrderLigneByOrderId(this.OrdId).subscribe((supp : any )=>{
                    this.SupplierId=supp[0].Supplier ;
                    this.auth.getUserById(this.SupplierId).subscribe((resultat: any)=>{
                         this.supplier=resultat[0];
                         this.supplierName="Fournisseur :"+this.supplier.U_FirstName;
                         this.supplierEmail=this.supplier.U_Email;
                         this.supplierTel=this.supplier.U_Tel;
                    })
                  })
              }
            })
          })
          this.date = this.datePipe.transform(this.facture.Create_at, 'dd/MM/yyyy');
        })
      }
    })
}

 generatePDF(){
  let docDefinition = {
    content: [
      {
        text: 'FACTURE',
        fontSize: 24,
        alignment: 'center',
        color: 'darkblue'
      },
      [ {
        text: `Date: ${new Date().toLocaleString()}`,
        alignment: 'right'
        },
      ],
    {columns:[
      {text:'DE',margin :[ 0, 70, 10, 0 ],color:'grey'},
      {text:'A`',margin :[ 0, 70, 30,0],color:'grey' }
    ]},

      { columns :[
        {
        ul:[
            {text:'Nom ' +this.supplierName,bold:true },
            {text:'Email :' + this.supplierEmail},
            {text:'Téléphone :' + this.supplierTel},
        ],},
        {
        ul:[
          {text:'Nom du Client: '+ this.user.U_FirstName,
          bold:true},
          {text:'Email : '+this.user.U_Email},
          {text:'téléphone :'+this.user.U_Tel},
        ]
      } ,]},

      {
        text: 'Details de la facture',
        decoration: 'underline',
        style: 'sectionHeader',
        margin :[ 0, 50, 10,10 ]  },
      {text: 'Facture N° :'+ this.facture.Fact_Id},
      //date
      {text: 'Date de la commande :' + this.date},

      {text:'',margin: [ 5, 30, 10, 20 ] },
      //table des produits
       {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [{
                text: 'Nom du produit',
                style: 'tableHeader'
              },
              {
                text: 'Prix',
                style: 'tableHeader'
              },
              {
                text: 'Quantité',
                style: 'tableHeader'
              }
              ],
              ...this.orders[0][1].map((ord:any)=> {
                return [ord.Prod_Name, ord.Prod_Price, ord.Ord_Qte];
              })
            ]
          }
      },
      {text : 'Montant total :'+this.total , bold:true,margin:[400,10,5,5]},
      {text : 'Réduction en %:'+this.facture.Fact_Discount , bold:true,margin:[400,3,5,5]},
      {text : 'Total :'+this.TotalFinal , bold:true,margin:[400,3,5,5],color:'red',fontSize:17},
            ],
    styles: {
                sectionHeader: {
                    bold: true,
                    decoration: 'underline',
                    fontSize: 14,
                    margin: [0, 15, 0, 15]
                } ,
                tableHeader: {
                  color:'grey',
                  bold: true,
                  decoration: 'underline'
                },
            }
    };
   pdfMake.createPdf(docDefinition).open();
  }



}



