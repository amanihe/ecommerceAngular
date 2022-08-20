import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  addCateg(val: any) {
    return this.http.post(this.APIUrl + '/category/', val);

  }
  addProduct(val: any) {
    return this.http.post(this.APIUrl + '/product/', val);

  }
  addProductImg(val: any) {
    return this.http.post(this.APIUrl + '/productImg/', val);

  }
  addOrder(val: any) {
    return this.http.post(this.APIUrl + '/order/', val);

  }
  addOrderLign(val: any) {
    return this.http.post(this.APIUrl + '/orderLigne/', val);

  }
  CreateFacture(val: any) {
    return this.http.post(this.APIUrl + '/facture/', val);

  }


  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";
  constructor(private http: HttpClient) { }
  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }
  getCategList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/category');

  }
  addCateglist(val: any): Observable<any> {
    return this.http.post(this.APIUrl + '/category', val);
  }
  updateCateg(val: any): Observable<any> {
    return this.http.put(this.APIUrl + '/category/' + val.Categ_Id, val);
  }
  deleteCateg(val: any) {
    return this.http.delete(this.APIUrl + '/category/' + val);
  }

  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/product');

  }
  getProductById(id:any)
  {
    return this.http.get(this.APIUrl + '/ProductById/' + id);
  }
  getProductByCateg(id:any)
  {
    return this.http.get(this.APIUrl + '/get_Product_ByCateg/' + id);
  }
  getOrder(id:any)
  {
    return this.http.get(this.APIUrl + '/cart/' + id);
  }
  getProductImg(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/productImg');

  }
  addProductli(val: any): Observable<any> {
    return this.http.post(this.APIUrl + '/product', val);
  }
  updateProduct(val: any): Observable<any> {
    return this.http.put(this.APIUrl + '/product/' + val.Categ_Id, val);
  }
  deleteProduct(val: any) {
    return this.http.delete(this.APIUrl + '/product/' + val);
  }


  getRequest(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/request');

  }


  getCltList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/client');

  }
  factureByIdUrl='http://127.0.0.1:8000/get_Facture_ById'
  getFactureById(id:any)
  {
    return this.http.get<any>(`${this.factureByIdUrl}/${id}`)}
  getFactureByOrder(id:any)
  {
    return this.http.get(this.APIUrl + '/get_Facture_ByOrder/' + id);
   }
   getFacture(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/facture/');

  }
  getFactureByUser(id:any){
   return this.http.get(this.APIUrl + '/FactureByUser/' + id);
  }
  getOrderLigneByOrderId(id:any){
    return this.http.get(this.APIUrl + '/OrderLigneByOrderId/' + id);
  }
  getHistory(ord: any) {
    return this.http.get(this.APIUrl + '/orderHistory/' + ord);
  }
  filterFactureDate(facture:any[],key:any):any{
    //console.log('keyyyy',key)
    const regex = new RegExp(key,"i");
    //console.log('regex',regex)
    const facturesFiltred = facture.filter(element =>
     (element.Create_at).match(key)
    );
    //console.log('filtre',facturesFiltred)
    return(facturesFiltred);
  }
  filterFactureName(facture:any[],key:any):any{
    //console.log('keyyyy',key)
    const regex = new RegExp(key,"i");
    //console.log('regex',regex)
    const facturesFiltred = facture.filter(element =>
     (element.U_FirstName).match(key)
    );
    //console.log('filtre',facturesFiltred)
    return(facturesFiltred);
  }
 
 

}
