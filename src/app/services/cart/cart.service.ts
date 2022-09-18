import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  addOrder(val: any) {
    return this.http.post(this.APIUrl + '/order/', val);
  }
  addOrderLign(val: any) {
    return this.http.post(this.APIUrl + '/orderLigne/', val);
  }
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http: HttpClient) {}
  getOrder(id: any) {
    return this.http.get(this.APIUrl + '/cart/' + id);
  }
  getAllOrder() {
    return this.http.get(this.APIUrl + '/orderCustomer/');
  }
  getAllOrderFnx(id:any) {
    return this.http.get(this.APIUrl + '/orderAdmin/'+id);
  }
  getOrderByUser(id: any) {
    return this.http.get(this.APIUrl + '/orderByUser/' + id);
  }
  getOrderById(id:any){
    return this.http.get(this.APIUrl + '/get_Order_ById/' + id);
  }
  getHistory(ord: any) {
    return this.http.get(this.APIUrl + '/orderHistory/' + ord);
  }
  getOrderItem(id: any) {
    return this.http.get(this.APIUrl + '/cartItem/' + id);
  }
  removeOrderItem(id: any) {
    return this.http.delete(this.APIUrl + '/orderLigne/' + id);
  }
  editQte(id: any, val: any) {
    return this.http.put(this.APIUrl + '/editcartItem/' + id, val);
  }
  editProductQte(id: any, val: any) {
    return this.http.put(this.APIUrl + '/editProduct/' + id, val);
  }
  editStatus(id: any, val: any) {
    return this.http.put(this.APIUrl + '/editOrderStatus/' + id, val);
  }
  getProduct(id: any) {
    return this.http.get(this.APIUrl + '/ProductById/' + id);
  }
  getBest() {
    return this.http.get(this.APIUrl + '/bestProduct' );
  }
  updateOrderLigne(val: any): Observable<any> {
    return this.http.put(this.APIUrl + '/orderLigne/' + val.OrdLign_Id, val);
  }
  updateOrder(val: any): Observable<any> {
    return this.http.put(this.APIUrl + '/order/' + val.Ord_Id, val);
  }
  sendEmail(val:any) {
   // alert("check mail");
    return this.http.post(this.APIUrl + '/sendMail', val);
  }
  sendEmailForMdp(val:any) {
    // alert("check mail");
     return this.http.post(this.APIUrl + '/sendMailForMdp', val);
   }
}
